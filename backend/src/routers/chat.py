from fastapi import APIRouter

from ..models import ChatRequest, ChatResponse
from ..services.groq_service import chat_completion

router = APIRouter(tags=["chat"])


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest) -> ChatResponse:
    messages = [msg.model_dump() for msg in request.history]
    messages.append({"role": "user", "content": request.message})
    response = chat_completion(messages)
    return ChatResponse(response=response)

