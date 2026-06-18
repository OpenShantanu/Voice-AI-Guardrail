import asyncio

from fastapi import (
    APIRouter,
    WebSocket,
    WebSocketDisconnect
)

from app.websocket.manager import (
    manager
)

router = APIRouter()


@router.websocket("/ws")
async def websocket_endpoint(
    websocket: WebSocket
):

    await manager.connect(
        websocket
    )

    try:

        await websocket.send_json(
            {
                "stage": "CONNECTED",
                "message": "Connected"
            }
        )

        while True:

            try:

                await asyncio.wait_for(
                    websocket.receive_text(),
                    timeout=30
                )

            except asyncio.TimeoutError:

                await websocket.send_json(
                    {
                        "stage": "HEARTBEAT"
                    }
                )

    except WebSocketDisconnect:

        manager.disconnect(
            websocket
        )

    except Exception as e:

        manager.disconnect(
            websocket
        )

        print(
            f"WebSocket Error: {e}"
        )