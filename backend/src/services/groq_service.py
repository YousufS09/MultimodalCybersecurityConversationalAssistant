import base64
import json
from typing import Any, Optional

from fastapi import HTTPException

from ..config.settings import get_settings
from .security_prompt_service import ANALYSIS_JSON_PROMPT, SYSTEM_PROMPT

try:
    from groq import Groq
except Exception:  # pragma: no cover - import guard
    Groq = None


def _get_client() -> Any:
    settings = get_settings()
    if not settings.groq_api_key:
        raise HTTPException(status_code=500, detail="GROQ_API_KEY is not configured.")
    if Groq is None:
        raise HTTPException(status_code=500, detail="Groq SDK is not installed.")
    return Groq(api_key=settings.groq_api_key)


def _extract_json(text: str) -> dict[str, Any]:
    cleaned = text.strip()
    if cleaned.startswith("```"):
        cleaned = cleaned.strip("`")
        cleaned = cleaned.replace("json", "", 1).strip()

    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        start = cleaned.find("{")
        end = cleaned.rfind("}")
        if start != -1 and end != -1 and end > start:
            return json.loads(cleaned[start : end + 1])
        raise


def _normalize_analysis(data: dict[str, Any], raw: str) -> dict[str, Any]:
    risk = str(data.get("risk_level", "Medium")).strip().title()
    if risk not in {"Low", "Medium", "High", "Critical"}:
        risk = "Medium"

    def _as_list(value: Any) -> list[str]:
        if isinstance(value, list):
            return [str(item).strip() for item in value if str(item).strip()]
        if isinstance(value, str) and value.strip():
            return [value.strip()]
        return []

    return {
        "summary": str(data.get("summary", "")).strip() or "No summary available.",
        "risk_level": risk,
        "evidence": _as_list(data.get("evidence")),
        "possible_threat_type": str(data.get("possible_threat_type", "Unknown")).strip() or "Unknown",
        "recommended_actions": _as_list(data.get("recommended_actions")),
        "prevention_tips": _as_list(data.get("prevention_tips")),
        "disclaimer": str(data.get("disclaimer", "")).strip()
        or "Defensive analysis only. Validate findings in your environment.",
        "raw_response": raw,
    }


def chat_completion(messages: list[dict[str, str]], model: Optional[str] = None) -> str:
    settings = get_settings()
    client = _get_client()
    response = client.chat.completions.create(
        model=model or settings.groq_model,
        messages=[{"role": "system", "content": SYSTEM_PROMPT}, *messages],
        temperature=0.2,
        max_tokens=900,
    )
    return response.choices[0].message.content.strip()


def analyze_text(subject: str, content: str, analysis_type: str, extra_context: str = "") -> dict[str, Any]:
    settings = get_settings()
    client = _get_client()
    prompt = (
        f"You are analyzing a {analysis_type} for cybersecurity risk.\n"
        f"Subject: {subject}\n"
        f"Context: {extra_context}\n"
        f"Content:\n{content}\n\n"
        f"{ANALYSIS_JSON_PROMPT}"
    )
    response = client.chat.completions.create(
        model=settings.groq_model,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": prompt},
        ],
        temperature=0.15,
        max_tokens=1200,
    )
    raw = response.choices[0].message.content.strip()
    data = _extract_json(raw)
    return _normalize_analysis(data, raw)


def analyze_image(subject: str, content: str, image_bytes: bytes, mime_type: str) -> dict[str, Any]:
    settings = get_settings()
    client = _get_client()
    encoded = base64.b64encode(image_bytes).decode("utf-8")
    image_url = f"data:{mime_type};base64,{encoded}"
    response = client.chat.completions.create(
        model=settings.groq_vision_model,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": (
                            f"Analyze this cybersecurity screenshot or image.\n"
                            f"Subject: {subject}\n"
                            f"Context: {content}\n\n"
                            f"{ANALYSIS_JSON_PROMPT}"
                        ),
                    },
                    {"type": "image_url", "image_url": {"url": image_url}},
                ],
            },
        ],
        temperature=0.15,
        max_tokens=1200,
    )
    raw = response.choices[0].message.content.strip()
    data = _extract_json(raw)
    return _normalize_analysis(data, raw)
