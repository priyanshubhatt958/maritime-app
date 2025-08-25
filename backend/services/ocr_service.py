import pytesseract
from PIL import Image
import cv2
import numpy as np
import pdf2image
from pathlib import Path
import asyncio
import io
from typing import List, Optional
from ..core.config import settings

class OCRService:
    def __init__(self):
        if settings.TESSERACT_PATH:
            pytesseract.pytesseract.tesseract_cmd = settings.TESSERACT_PATH
    
    async def extract_text_from_pdf(self, pdf_path: str) -> str:
        """Extract text from PDF using OCR"""
        try:
            # Convert PDF to images
            images = pdf2image.convert_from_path(pdf_path)
            
            extracted_text = ""
            for i, image in enumerate(images):
                # Preprocess image for better OCR
                processed_image = await self._preprocess_image(image)
                
                # Extract text using Tesseract
                page_text = pytesseract.image_to_string(
                    processed_image,
                    lang=settings.OCR_LANGUAGES,
                    config='--psm 6'
                )
                
                extracted_text += f"\n--- Page {i+1} ---\n{page_text}\n"
            
            return extracted_text.strip()
            
        except Exception as e:
            raise Exception(f"OCR extraction failed: {str(e)}")
    
    async def extract_text_from_image(self, image_path: str) -> str:
        """Extract text from image file"""
        try:
            image = Image.open(image_path)
            processed_image = await self._preprocess_image(image)
            
            text = pytesseract.image_to_string(
                processed_image,
                lang=settings.OCR_LANGUAGES,
                config='--psm 6'
            )
            
            return text.strip()
            
        except Exception as e:
            raise Exception(f"Image OCR failed: {str(e)}")
    
    async def _preprocess_image(self, image: Image.Image) -> Image.Image:
        """Preprocess image for better OCR accuracy"""
        # Convert PIL image to OpenCV format
        opencv_image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
        
        # Convert to grayscale
        gray = cv2.cvtColor(opencv_image, cv2.COLOR_BGR2GRAY)
        
        # Apply denoising
        denoised = cv2.fastNlMeansDenoising(gray)
        
        # Apply adaptive thresholding
        thresh = cv2.adaptiveThreshold(
            denoised, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2
        )
        
        # Morphological operations to clean up
        kernel = np.ones((1, 1), np.uint8)
        cleaned = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel)
        
        # Convert back to PIL Image
        return Image.fromarray(cleaned)
    
    async def detect_document_structure(self, image_path: str) -> dict:
        """Detect document structure and layout"""
        try:
            image = Image.open(image_path)
            
            # Get detailed OCR data with bounding boxes
            data = pytesseract.image_to_data(
                image,
                lang=settings.OCR_LANGUAGES,
                output_type=pytesseract.Output.DICT
            )
            
            # Analyze structure
            structure = {
                "tables": [],
                "headers": [],
                "paragraphs": [],
                "confidence_scores": []
            }
            
            # Process OCR data to identify structure
            for i in range(len(data['text'])):
                if int(data['conf'][i]) > 30:  # Confidence threshold
                    text = data['text'][i].strip()
                    if text:
                        bbox = {
                            'x': data['left'][i],
                            'y': data['top'][i],
                            'width': data['width'][i],
                            'height': data['height'][i]
                        }
                        
                        structure['confidence_scores'].append({
                            'text': text,
                            'confidence': data['conf'][i],
                            'bbox': bbox
                        })
            
            return structure
            
        except Exception as e:
            raise Exception(f"Structure detection failed: {str(e)}")
    
    async def enhance_image_quality(self, image_path: str, output_path: str) -> str:
        """Enhance image quality for better OCR"""
        try:
            image = cv2.imread(image_path)
            
            # Upscale image
            height, width = image.shape[:2]
            upscaled = cv2.resize(image, (width * 2, height * 2), interpolation=cv2.INTER_CUBIC)
            
            # Apply sharpening
            kernel = np.array([[-1,-1,-1], [-1,9,-1], [-1,-1,-1]])
            sharpened = cv2.filter2D(upscaled, -1, kernel)
            
            # Adjust contrast and brightness
            enhanced = cv2.convertScaleAbs(sharpened, alpha=1.2, beta=10)
            
            # Save enhanced image
            cv2.imwrite(output_path, enhanced)
            
            return output_path
            
        except Exception as e:
            raise Exception(f"Image enhancement failed: {str(e)}")