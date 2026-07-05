from typing import Any, List, Literal, Optional

from pydantic import BaseModel, Field


RiskLevel = Literal["Low", "Medium", "High", "Critical"]


class ChatMessage(BaseModel):
    role: Literal["system", "user", "assistant"]
    content: str


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=8000)
    history: List[ChatMessage] = Field(default_factory=list)


class LogAnalysisRequest(BaseModel):
    logs: str = Field(min_length=1, max_length=30000)
    title: Optional[str] = Field(default="Log analysis")


class UrlAnalysisRequest(BaseModel):
    url: str = Field(min_length=5, max_length=2048)


class IndicatorAnalysisRequest(BaseModel):
    indicator: str = Field(min_length=1, max_length=2048)
    indicator_type: Optional[str] = Field(default="unknown")


class ReportRequest(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    subject: str = Field(min_length=1, max_length=1000)
    analysis: Optional[dict[str, Any]] = None
    notes: Optional[str] = Field(default="")


class AnalysisResponse(BaseModel):
    summary: str
    risk_level: RiskLevel
    evidence: List[str]
    possible_threat_type: str
    recommended_actions: List[str]
    prevention_tips: List[str]
    disclaimer: str
    raw_response: Optional[str] = None


class ChatResponse(BaseModel):
    response: str

