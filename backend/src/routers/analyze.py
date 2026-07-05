from fastapi import APIRouter

from ..models import AnalysisResponse, IndicatorAnalysisRequest, LogAnalysisRequest, UrlAnalysisRequest
from ..services.groq_service import analyze_text
from ..utils.validators import validate_indicator, validate_url

router = APIRouter(tags=["analysis"])


@router.post("/analyze/logs", response_model=AnalysisResponse)
async def analyze_logs(request: LogAnalysisRequest) -> AnalysisResponse:
    data = analyze_text(
        subject=request.title or "Log analysis",
        content=request.logs,
        analysis_type="log analysis",
    )
    return AnalysisResponse(**data)


@router.post("/analyze/url", response_model=AnalysisResponse)
async def analyze_url(request: UrlAnalysisRequest) -> AnalysisResponse:
    url = validate_url(request.url)
    data = analyze_text(
        subject="Suspicious URL analysis",
        content=url,
        analysis_type="URL / phishing analysis",
        extra_context="Assess domain reputation patterns, redirects, subdomain abuse, and phishing indicators.",
    )
    return AnalysisResponse(**data)


@router.post("/analyze/indicator", response_model=AnalysisResponse)
async def analyze_indicator(request: IndicatorAnalysisRequest) -> AnalysisResponse:
    indicator = validate_indicator(request.indicator)
    data = analyze_text(
        subject=f"Threat intelligence for {request.indicator_type}",
        content=indicator,
        analysis_type="threat intelligence analysis",
        extra_context="Explain what this indicator means, how it may be used in investigations, and what to check next.",
    )
    return AnalysisResponse(**data)

