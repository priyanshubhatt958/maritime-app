from pydantic_settings import BaseSettings
from typing import Optional
import os

class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = "postgresql://user:password@localhost/maritime_db"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379"
    
    # JWT
    SECRET_KEY: str = "maritime-assistant-secret-key-2024"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # OpenRouter API for AI/NLP
    OPENROUTER_API_KEY: Optional[str] = None
    OPENROUTER_BASE_URL: str = "https://openrouter.ai/api/v1"
    OPENROUTER_MODEL: str = "anthropic/claude-3.5-sonnet"
    
    # Weather APIs
    OPENWEATHER_API_KEY: Optional[str] = None
    NOAA_API_KEY: Optional[str] = None
    WEATHERAPI_KEY: Optional[str] = None
    
    # File Storage
    UPLOAD_DIR: str = "uploads"
    EXPORT_DIR: str = "exports"
    GENERATED_DIR: str = "generated"
    MAX_FILE_SIZE: int = 100 * 1024 * 1024  # 100MB
    
    # OCR Settings
    TESSERACT_PATH: Optional[str] = None
    OCR_LANGUAGES: str = "eng"
    
    # AI Processing
    MAX_TOKENS: int = 8000
    TEMPERATURE: float = 0.1
    
    # Document Processing
    SUPPORTED_FORMATS: list = [".pdf", ".docx", ".doc", ".txt"]
    
    class Config:
        env_file = ".env"

settings = Settings()