from fastapi import HTTPException


def validate_indicator(indicator: str) -> str:
    value = indicator.strip()
    if not value:
        raise HTTPException(status_code=400, detail="Indicator cannot be empty.")
    return value


def validate_url(url: str) -> str:
    value = url.strip()
    if not value.startswith(("http://", "https://")):
        raise HTTPException(status_code=400, detail="URL must start with http:// or https://")
    return value

