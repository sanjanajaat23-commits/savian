import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")


def get_env(key: str, default: str = "") -> str:
    return os.getenv(key, default)


APP_NAME = get_env("APP_NAME", "STRADEXI")
ENVIRONMENT = get_env("ENVIRONMENT", "development")
FRONTEND_URL = get_env("FRONTEND_URL", "http://localhost:5173")
DATABASE_PATH = get_env("DATABASE_PATH", str(BASE_DIR / "data" / "stradexi.db"))
NOTIFY_EMAIL = get_env("NOTIFY_EMAIL", "sanjanajaat23@gmail.com")
SMTP_HOST = get_env("SMTP_HOST", "")
SMTP_PORT = int(get_env("SMTP_PORT", "587"))
SMTP_USERNAME = get_env("SMTP_USERNAME", "")
SMTP_PASSWORD = get_env("SMTP_PASSWORD", "")
SMTP_FROM = get_env("SMTP_FROM", "")
CALCOM_API_URL = get_env("CALCOM_API_URL", "https://api.cal.com")
CALCOM_API_KEY = get_env("CALCOM_API_KEY", "")
CALCOM_EVENT_TYPE_ID = get_env("CALCOM_EVENT_TYPE_ID", "")
ADMIN_PASSWORD = get_env("ADMIN_PASSWORD", "admin-demo-password")
ADMIN_SESSION_SECRET = get_env("ADMIN_SESSION_SECRET", "local-dev-secret")
CORS_ORIGINS = [
    origin.strip()
    for origin in get_env("CORS_ORIGINS", FRONTEND_URL).split(",")
    if origin.strip()
]

os.makedirs(Path(DATABASE_PATH).parent, exist_ok=True)
