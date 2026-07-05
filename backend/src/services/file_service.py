import base64
import csv
import io
import json
from pathlib import Path
from typing import Any

from fastapi import HTTPException, UploadFile
from pypdf import PdfReader

from ..config.settings import get_settings
from ..middleware.upload_middleware import validate_upload

TEXT_EXTENSIONS = {".txt", ".log", ".csv", ".json", ".md"}
IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp"}


async def read_upload(upload: UploadFile) -> dict[str, Any]:
    settings = get_settings()
    ext = Path(upload.filename or "").suffix.lower()

    data = await upload.read()
    max_bytes = settings.max_upload_mb * 1024 * 1024
    validate_upload(upload.filename or "", len(data), max_bytes)

    if ext == ".pdf":
        return {"kind": "text", "content": _extract_pdf_text(data), "name": upload.filename}
    if ext in {".csv"}:
        return {"kind": "text", "content": _extract_csv_text(data), "name": upload.filename}
    if ext in {".json"}:
        return {"kind": "text", "content": _extract_json_text(data), "name": upload.filename}
    if ext in TEXT_EXTENSIONS:
        return {"kind": "text", "content": data.decode("utf-8", errors="replace"), "name": upload.filename}
    if ext in IMAGE_EXTENSIONS:
        return {
            "kind": "image",
            "content": "",
            "name": upload.filename,
            "mime_type": upload.content_type or "image/png",
            "bytes": data,
            "preview": base64.b64encode(data).decode("utf-8"),
        }

    raise HTTPException(status_code=400, detail="Unsupported file type.")


def _extract_pdf_text(data: bytes) -> str:
    try:
        reader = PdfReader(io.BytesIO(data))
        pages = [page.extract_text() or "" for page in reader.pages]
        return "\n".join(pages).strip()
    except Exception as exc:
        raise HTTPException(status_code=400, detail="Unable to read PDF file.") from exc


def _extract_csv_text(data: bytes) -> str:
    decoded = data.decode("utf-8", errors="replace")
    reader = csv.reader(io.StringIO(decoded))
    rows = [" | ".join(row) for row in reader]
    return "\n".join(rows).strip()


def _extract_json_text(data: bytes) -> str:
    decoded = data.decode("utf-8", errors="replace")
    try:
        parsed = json.loads(decoded)
        return json.dumps(parsed, indent=2)
    except json.JSONDecodeError as exc:
        raise HTTPException(status_code=400, detail="Invalid JSON file.") from exc
