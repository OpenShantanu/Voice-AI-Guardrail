SUSPICIOUS_KEYWORDS = [
    "ignore previous instructions",
    "system prompt",
    "developer prompt",
    "bypass",
    "reveal prompt",
    "jailbreak",
    "disable safety"
]

def evaluate_rules(
    transcript: str
):

    transcript = transcript.lower()

    matches = []

    for keyword in SUSPICIOUS_KEYWORDS:

        if keyword in transcript:

            matches.append(keyword)

    score = min(
        len(matches) * 20,
        100
    )

    return score, matches