import smtplib
from email.message import EmailMessage

from .config import NOTIFY_EMAIL, SMTP_FROM, SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USERNAME


def send_contact_notification(contact: dict) -> bool:
    if not SMTP_HOST or not SMTP_USERNAME or not SMTP_PASSWORD:
        return False

    message = EmailMessage()
    message["Subject"] = f"New STRADEXI inquiry from {contact['name']}"
    message["From"] = SMTP_FROM or SMTP_USERNAME
    message["To"] = NOTIFY_EMAIL
    message.set_content(
        "\n".join(
            [
                f"Name: {contact['name']}",
                f"Work email: {contact['work_email']}",
                f"Company: {contact.get('company', '')}",
                f"Role: {contact.get('role', '')}",
                f"Industry: {contact.get('industry', '')}",
                f"Current process: {contact.get('current_process', '')}",
                f"Biggest time sink: {contact.get('biggest_time_sink', '')}",
            ]
        )
    )

    try:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.send_message(message)
        return True
    except Exception:
        return False
