from pathlib import Path

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    HTTPException
)

from app.config import settings

from app.websocket.manager import (
    manager
)

from app.services.whisper_service import (
    transcribe_audio
)

from app.services.rule_engine import (
    evaluate_rules
)

from app.services.embedding_engine import (
    similarity_score
)

from app.services.groq_service import (
    classify_attack
)

from app.services.policy_engine import (
    make_decision
)

router = APIRouter()

Path(
    settings.UPLOAD_DIR
).mkdir(
    parents=True,
    exist_ok=True
)


@router.post("/analyze")
async def analyze_audio(
    file: UploadFile = File(...)
):

    try:

        await manager.broadcast({
            "stage": "UPLOAD_RECEIVED",
            "message": "Audio file received"
        })

        filepath = (
            Path(settings.UPLOAD_DIR)
            / file.filename
        )

        with open(
            filepath,
            "wb"
        ) as f:

            f.write(
                await file.read()
            )

        await manager.broadcast({
            "stage": "TRANSCRIBING",
            "message": "Running Faster Whisper"
        })

        transcript = (
            transcribe_audio(
                str(filepath)
            )
        )

        await manager.broadcast({
            "stage": "RULE_ENGINE",
            "message": "Checking prompt injection patterns"
        })

        rule_score, matches = (
            evaluate_rules(
                transcript
            )
        )

        await manager.broadcast({
            "stage": "EMBEDDING_ENGINE",
            "message": "Calculating semantic similarity"
        })

        similarity = (
            similarity_score(
                transcript
            )
        )

        await manager.broadcast({
            "stage": "GROQ_CLASSIFIER",
            "message": "Classifying transcript"
        })

        groq_result = (
            classify_attack(
                transcript
            )
        )

        await manager.broadcast({
            "stage": "POLICY_ENGINE",
            "message": "Making final decision"
        })

        risk_score, decision = (
            make_decision(
                rule_score,
                similarity,
                groq_result
            )
        )

        response = {

            "transcript": transcript,

            "rule_score": rule_score,

            "similarity_score": round(
                similarity,
                4
            ),

            "groq_result": groq_result,

            "risk_score": risk_score,

            "decision": decision,

            "matches": matches
        }

        await manager.broadcast({
            "stage": "COMPLETE",
            "decision": decision,
            "risk_score": risk_score
        })

        return response

    except Exception as e:

        await manager.broadcast({
            "stage": "ERROR",
            "message": str(e)
        })

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )