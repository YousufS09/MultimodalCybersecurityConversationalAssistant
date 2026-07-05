from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config.settings import get_settings
from .middleware.error_handler import register_error_handlers
from .routers.analyze import router as analyze_router
from .routers.chat import router as chat_router
from .routers.report import router as report_router
from .routers.upload import router as upload_router


def create_app() -> FastAPI:
    settings = get_settings()

    app = FastAPI(
        title="Multimodal Cybersecurity AI Assistant",
        version="1.0.0",
        description="A Groq-powered cybersecurity analysis API for chat, logs, URLs, files, and reports.",
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.allowed_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    register_error_handlers(app)
    app.include_router(chat_router, prefix="/api")
    app.include_router(analyze_router, prefix="/api")
    app.include_router(upload_router, prefix="/api")
    app.include_router(report_router, prefix="/api")

    @app.get("/")
    async def root() -> dict:
        return {
            "message": "Multimodal Cybersecurity AI Assistant backend is running.",
            "status": "ok",
        }

    @app.get("/health")
    async def health() -> dict:
        return {"status": "healthy"}

    return app

