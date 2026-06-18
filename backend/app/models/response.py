from pydantic import BaseModel
from typing import List


class SecurityResponse(BaseModel):

    transcript: str

    rule_score: int

    similarity_score: float

    groq_result: str

    risk_score: int

    decision: str

    matches: List[str]