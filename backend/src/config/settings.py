from functools import lru_cache
from typing import List

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    groq_api_key: str = Field(default="", alias="GROQ_API_KEY")
    groq_model: str = Field(default="meta-llama/llama-4-scout-17b-16e-instruct", alias="GROQ_MODEL")
    groq_vision_model: str = Field(
        default="meta-llama/llama-4-scout-17b-16e-instruct",
        alias="GROQ_VISION_MODEL",
    )
    frontend_origin: str = Field(default="http://localhost:5173", alias="FRONTEND_ORIGIN")
    allowed_origins_raw: str = Field(
        default="http://localhost:5173,http://127.0.0.1:5173",
        alias="ALLOWED_ORIGINS",
    )
    max_upload_mb: int = Field(default=5, alias="MAX_UPLOAD_MB")

    @property
    def allowed_origins(self) -> List[str]:
        origins = [origin.strip() for origin in self.allowed_origins_raw.split(",") if origin.strip()]
        return origins or [self.frontend_origin]


@lru_cache
def get_settings() -> Settings:
    return Settings()
