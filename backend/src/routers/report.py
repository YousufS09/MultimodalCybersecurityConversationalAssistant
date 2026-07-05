from fastapi import APIRouter

from ..models import ReportRequest
from ..services.report_service import build_report

router = APIRouter(tags=["report"])


@router.post("/report/generate")
async def generate_report(request: ReportRequest) -> dict:
    return build_report(
        title=request.title,
        subject=request.subject,
        analysis=request.analysis,
        notes=request.notes or "",
    )

