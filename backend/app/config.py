from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    GROQ_API_KEY: str

    WHISPER_MODEL: str = "base"

    UPLOAD_DIR: str = "app/uploads"

    class Config:
        env_file = ".env"


settings = Settings()