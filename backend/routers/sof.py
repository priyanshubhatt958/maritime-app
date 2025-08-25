from fastapi import APIRouter, File, UploadFile, HTTPException, BackgroundTasks, Depends, Form
from fastapi.responses import FileResponse
from typing import List, Optional
import asyncio
import os
import uuid
from datetime import datetime
from pathlib import Path

from ..services.document_processor import DocumentProcessor
from ..services.ai_service import AIService
from ..models.sof import SofProcessingRequest, SofProcessingResponse, SofEvent
from ..core.config import settings

router = APIRouter()

@router.post("/process", response_model=dict)
async def process_sof_document(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    mode: str = Form("accuracy"),
    port_timezone: str = Form("UTC"),
    enable_ocr: bool = Form(True)
):
    """
    Process Statement of Facts document and extract events with AI/OCR
    """
    # Validate file
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")
    
    file_ext = Path(file.filename).suffix.lower()
    if file_ext not in settings.SUPPORTED_FORMATS:
        raise HTTPException(
            status_code=400, 
            detail=f"Unsupported file format. Supported: {', '.join(settings.SUPPORTED_FORMATS)}"
        )
    
    if file.size and file.size > settings.MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File size exceeds maximum limit")
    
    # Generate unique processing ID
    processing_id = str(uuid.uuid4())
    
    # Save uploaded file
    upload_path = os.path.join(settings.UPLOAD_DIR, f"{processing_id}_{file.filename}")
    
    try:
        # Save file
        with open(upload_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        # Process document
        processor = DocumentProcessor()
        result = await processor.process_sof_document(
            upload_path, mode, port_timezone, enable_ocr
        )
        
        # Add processing metadata
        result["processing_id"] = processing_id
        result["filename"] = file.filename
        result["file_size"] = len(content)
        
        # Schedule cleanup
        background_tasks.add_task(cleanup_file, upload_path)
        
        return result
        
    except Exception as e:
        # Clean up on error
        if os.path.exists(upload_path):
            os.remove(upload_path)
        raise HTTPException(status_code=500, detail=f"Processing failed: {str(e)}")

@router.post("/export")
async def export_events(
    events: List[dict],
    format: str = "csv",
    filename: Optional[str] = None
):
    """
    Export processed events in CSV or JSON format
    """
    if format not in ["csv", "json"]:
        raise HTTPException(status_code=400, detail="Format must be 'csv' or 'json'")
    
    if not events:
        raise HTTPException(status_code=400, detail="No events provided for export")
    
    # Generate export filename
    timestamp = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
    base_filename = filename or f"sof_events_{timestamp}"
    export_filename = f"{base_filename}.{format}"
    export_path = os.path.join(settings.EXPORT_DIR, export_filename)
    
    try:
        processor = DocumentProcessor()
        
        if format == "csv":
            await processor.export_events_csv(events, export_path)
        else:
            await processor.export_events_json(events, export_path)
        
        return FileResponse(
            export_path,
            media_type="application/octet-stream",
            filename=export_filename,
            background=BackgroundTasks().add_task(cleanup_file, export_path)
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Export failed: {str(e)}")

@router.get("/templates")
async def get_sof_templates():
    """
    Get available SoF templates and processing options
    """
    return {
        "templates": [
            {
                "id": "standard",
                "name": "Standard SoF Template",
                "description": "Most common maritime SoF format",
                "confidence_boost": 0.1
            },
            {
                "id": "detailed",
                "name": "Detailed SoF Template", 
                "description": "Extended event logging with timestamps",
                "confidence_boost": 0.15
            },
            {
                "id": "minimal",
                "name": "Minimal SoF Template",
                "description": "Basic event tracking format",
                "confidence_boost": 0.05
            }
        ],
        "processing_modes": [
            {
                "id": "accuracy",
                "name": "High Accuracy Mode",
                "description": "AI + OCR processing for maximum accuracy",
                "cost_factor": 1.0
            },
            {
                "id": "cost-saving",
                "name": "Cost-Saving Mode", 
                "description": "Local processing with basic pattern matching",
                "cost_factor": 0.1
            }
        ],
        "supported_formats": settings.SUPPORTED_FORMATS,
        "max_file_size_mb": settings.MAX_FILE_SIZE // (1024 * 1024)
    }

@router.post("/analyze-structure")
async def analyze_document_structure(
    file: UploadFile = File(...)
):
    """
    Analyze document structure for better processing
    """
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")
    
    processing_id = str(uuid.uuid4())
    upload_path = os.path.join(settings.UPLOAD_DIR, f"struct_{processing_id}_{file.filename}")
    
    try:
        # Save file temporarily
        with open(upload_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        # Analyze structure
        from ..services.ocr_service import OCRService
        ocr_service = OCRService()
        
        if file.filename.lower().endswith('.pdf'):
            # Convert first page to image for structure analysis
            import pdf2image
            images = pdf2image.convert_from_path(upload_path, first_page=1, last_page=1)
            if images:
                temp_image_path = upload_path.replace('.pdf', '_temp.png')
                images[0].save(temp_image_path)
                structure = await ocr_service.detect_document_structure(temp_image_path)
                os.remove(temp_image_path)
            else:
                structure = {"error": "Could not convert PDF to image"}
        else:
            structure = {"error": "Structure analysis only supported for PDF files"}
        
        # Cleanup
        os.remove(upload_path)
        
        return {
            "filename": file.filename,
            "structure": structure,
            "recommendations": {
                "ocr_recommended": len(structure.get('confidence_scores', [])) > 0,
                "processing_mode": "accuracy" if structure.get('confidence_scores') else "cost-saving"
            }
        }
        
    except Exception as e:
        if os.path.exists(upload_path):
            os.remove(upload_path)
        raise HTTPException(status_code=500, detail=f"Structure analysis failed: {str(e)}")

async def cleanup_file(file_path: str):
    """Background task to clean up temporary files"""
    try:
        if os.path.exists(file_path):
            os.remove(file_path)
    except Exception:
        pass  # Ignore cleanup errors