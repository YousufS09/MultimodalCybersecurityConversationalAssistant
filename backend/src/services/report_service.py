from datetime import datetime, timezone
from typing import Any


def build_report(title: str, subject: str, analysis: dict[str, Any] | None, notes: str = "") -> dict[str, Any]:
    analysis = analysis or {}
    lines = [
        f"# {title}",
        "",
        f"Generated: {datetime.now(timezone.utc).isoformat()}",
        "",
        f"## Subject",
        subject.strip(),
        "",
        f"## Summary",
        analysis.get("summary", "No summary available."),
        "",
        f"## Risk Level",
        analysis.get("risk_level", "Unknown"),
        "",
        f"## Evidence",
    ]
    evidence = analysis.get("evidence") or []
    if evidence:
        lines.extend([f"- {item}" for item in evidence])
    else:
        lines.append("- No evidence provided.")
    lines.extend(
        [
            "",
            "## Possible Threat Type",
            analysis.get("possible_threat_type", "Unknown"),
            "",
            "## Recommended Actions",
        ]
    )
    actions = analysis.get("recommended_actions") or []
    lines.extend([f"- {item}" for item in actions] if actions else ["- Review alert sources and validate the signal."])
    lines.extend(["", "## Prevention Tips"])
    tips = analysis.get("prevention_tips") or []
    lines.extend([f"- {item}" for item in tips] if tips else ["- Maintain least privilege and patch regularly."])
    if notes.strip():
        lines.extend(["", "## Notes", notes.strip()])
    lines.extend(["", "## Disclaimer", analysis.get("disclaimer", "Defensive analysis only.")])
    report_markdown = "\n".join(lines).strip()
    return {
        "title": title,
        "report_markdown": report_markdown,
        "analysis": analysis,
    }

