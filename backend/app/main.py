from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.analyze import (
    router as analyze_router
)

from app.routes.websocket import (
    router as websocket_router
)

app = FastAPI(
    title="Voice Guardrail"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(
    analyze_router
)

app.include_router(
    websocket_router
)