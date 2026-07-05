from pathlib import Path

from fastapi import HTTPException

ALLOWED_EXTENSIONS = {".txt", ".log", ".csv", ".json", ".md", ".pdf", ".png", ".jpg", ".jpeg", ".webp"}


def validate_upload(filename: str, file_size: int, max_bytes: int) -> None:
    suffix = Path(filename or "").suffix.lower()
    if suffix not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail="Unsupported file type.")
    if file_size > max_bytes:
        raise HTTPException(status_code=413, detail="File exceeds the configured size limit.")

