import aiohttp
import json
from typing import List, Dict, Any, Optional
from ..core.config import settings
import asyncio

class AIService:
    def __init__(self):
        self.api_key = settings.OPENROUTER_API_KEY
        self.base_url = settings.OPENROUTER_BASE_URL
        self.model = settings.OPENROUTER_MODEL
        
    async def extract_sof_events(self, text: str, port_timezone: str = "UTC") -> Dict[str, Any]:
        """Extract events from Statement of Facts text using AI"""
        
        prompt = f"""
        You are a maritime document processing expert. Extract all events from this Statement of Facts document.
        
        Port Timezone: {port_timezone}
        
        Document Text:
        {text}
        
        Extract ALL events with their timestamps. Return a JSON object with this exact structure:
        {{
            "events": [
                {{
                    "event_name": "Event description",
                    "start_time_iso": "2024-01-15T08:30:00Z",
                    "end_time_iso": "2024-01-15T10:30:00Z or null",
                    "duration_minutes": 120 or null,
                    "page": 1,
                    "row_index": 1,
                    "confidence": 0.95
                }}
            ],
            "anomalies": [
                {{
                    "type": "Time Gap",
                    "message": "Description of anomaly",
                    "row_index": 1
                }}
            ]
        }}
        
        Important:
        - Extract ALL events, no matter how minor
        - Use ISO 8601 format for timestamps
        - Calculate duration_minutes if both start and end times exist
        - Assign confidence scores (0.0-1.0) based on clarity
        - Detect anomalies like time gaps, overlaps, or unclear entries
        - Be template-agnostic - work with any SoF format
        """
        
        return await self._make_request(prompt)
    
    async def process_fixture_recap(self, text: str) -> Dict[str, Any]:
        """Process free-text fixture recap into structured data"""
        
        prompt = f"""
        Extract structured data from this fixture recap text:
        
        {text}
        
        Return JSON with this structure:
        {{
            "vessel_name": "MV EXAMPLE",
            "laycan_start_iso": "2024-02-01T00:00:00Z",
            "laycan_end_iso": "2024-02-03T23:59:59Z",
            "load_port": "Hamburg",
            "discharge_port": "Singapore",
            "freight_rate": "$45.50 per MT",
            "demurrage_rate": "$12,500 per day",
            "cargo_description": "Steel coils",
            "special_terms": ["Load trim 10cm max", "Baltic exchange arbitration"]
        }}
        
        Extract all available information. Use null for missing fields.
        """
        
        return await self._make_request(prompt)
    
    async def generate_charter_party(self, recap_data: Dict, negotiated_clauses: str, template_content: str) -> Dict[str, Any]:
        """Generate charter party document by merging inputs"""
        
        prompt = f"""
        Generate a complete Charter Party document by intelligently merging:
        
        1. Fixture Recap Data:
        {json.dumps(recap_data, indent=2)}
        
        2. Negotiated Clauses:
        {negotiated_clauses}
        
        3. Base Template Content:
        {template_content[:2000]}...
        
        Return JSON with:
        {{
            "content": "Full charter party document text",
            "changes": [
                {{
                    "field": "Vessel Name",
                    "original_value": "[VESSEL_NAME]",
                    "new_value": "MV EXAMPLE",
                    "source": "recap"
                }}
            ]
        }}
        
        Merge intelligently:
        - Replace template placeholders with recap data
        - Integrate negotiated clauses appropriately
        - Maintain legal structure and formatting
        - Track all changes made
        """
        
        return await self._make_request(prompt)
    
    async def analyze_weather_impact(self, weather_data: Dict, route_data: Dict) -> Dict[str, Any]:
        """Analyze weather impact on maritime operations"""
        
        prompt = f"""
        Analyze weather impact on this maritime route:
        
        Weather Data:
        {json.dumps(weather_data, indent=2)}
        
        Route Data:
        {json.dumps(route_data, indent=2)}
        
        Provide recommendations for:
        - Optimal speed adjustments
        - Route modifications
        - Risk assessments
        - ETA impacts
        
        Return structured analysis with actionable recommendations.
        """
        
        return await self._make_request(prompt)
    
    async def _make_request(self, prompt: str) -> Dict[str, Any]:
        """Make request to OpenRouter API"""
        
        if not self.api_key:
            raise Exception("OpenRouter API key not configured")
        
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://maritime-assistant.com",
            "X-Title": "Maritime Assistant"
        }
        
        payload = {
            "model": self.model,
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "max_tokens": settings.MAX_TOKENS,
            "temperature": settings.TEMPERATURE
        }
        
        async with aiohttp.ClientSession() as session:
            async with session.post(
                f"{self.base_url}/chat/completions",
                headers=headers,
                json=payload
            ) as response:
                if response.status != 200:
                    error_text = await response.text()
                    raise Exception(f"AI API error: {error_text}")
                
                result = await response.json()
                content = result["choices"][0]["message"]["content"]
                
                # Try to parse as JSON
                try:
                    return json.loads(content)
                except json.JSONDecodeError:
                    # If not JSON, return as text
                    return {"content": content}