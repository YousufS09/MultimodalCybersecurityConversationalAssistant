from fastapi import APIRouter, File, Form, UploadFile

from ..models import AnalysisResponse
from ..services.file_service import read_upload
from ..services.groq_service import analyze_image, analyze_text

router = APIRouter(tags=["upload"])


@router.post("/upload/analyze", response_model=AnalysisResponse)
async def upload_analyze(
    file: UploadFile = File(...),
    title: str = Form(default="File analysis"),
    context: str = Form(default=""),
) -> AnalysisResponse:
    payload = await read_upload(file)
    if payload["kind"] == "image":
        data = analyze_image(
            subject=title,
            content=context,
            image_bytes=payload["bytes"],
            mime_type=payload["mime_type"],
        )
        return AnalysisResponse(**data)

    data = analyze_text(
        subject=title,
        content=payload["content"],
        analysis_type="file analysis",
        extra_context=context,
    )
    return AnalysisResponse(**data)

