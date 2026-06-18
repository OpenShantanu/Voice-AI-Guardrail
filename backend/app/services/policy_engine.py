def make_decision(
    rule_score,
    similarity,
    groq_result
):

    total = rule_score

    total += int(
        similarity * 50
    )

    if groq_result == "MALICIOUS":
        total += 30

    total = min(total, 100)

    if total >= 80:
        decision = "BLOCK"

    elif total >= 50:
        decision = "FLAG"

    else:
        decision = "ALLOW"

    return total, decision