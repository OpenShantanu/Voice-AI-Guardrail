from faster_whisper import WhisperModel

from app.config import settings

model = None


def get_model():

    global model

    if model is None:

        print(
            "Loading Whisper Model..."
        )

        model = WhisperModel(
            settings.WHISPER_MODEL,
            device="cpu",
            compute_type="int8"
        )

        print(
            "Whisper Loaded"
        )

    return model


def transcribe_audio(
    audio_path: str
):

    whisper_model = get_model()

    segments, info = (
        whisper_model.transcribe(
            audio_path
        )
    )

    transcript = " ".join(
        segment.text
        for segment in segments
    )

    return transcript.strip()