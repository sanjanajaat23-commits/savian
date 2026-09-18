import hashlib
import hmac
import time
from datetime import datetime, timezone
from typing import Any

from fastapi import FastAPI, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

from .config import ADMIN_PASSWORD, ADMIN_SESSION_SECRET, CORS_ORIGINS, FRONTEND_URL
from .database import manager
from .email_service import send_contact_notification

app = FastAPI(title="STRADEXI API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[*CORS_ORIGINS, FRONTEND_URL, "http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ContactRequest(BaseModel):
    name: str
    work_email: EmailStr
    company: str
    role: str
    industry: str
    current_process: str
    biggest_time_sink: str


class DemoRunRequest(BaseModel):
    workflow: str
    steps: list[str] | None = None


class AdminLoginRequest(BaseModel):
    username: str = "admin"
    password: str


@app.on_event("startup")
def startup() -> None:
    manager.init_db()


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "STRADEXI API", "timestamp": datetime.now(timezone.utc).isoformat()}


@app.post("/api/contacts")
def submit_contact(contact: ContactRequest) -> dict[str, Any]:
    payload = {
        "name": contact.name,
        "work_email": str(contact.work_email),
        "company": contact.company,
        "role": contact.role,
        "industry": contact.industry,
        "current_process": contact.current_process,
        "biggest_time_sink": contact.biggest_time_sink,
    }

    record = manager.save_contact(**payload)
    send_contact_notification(record)
    return {"status": "success", "message": "Inquiry received. We will follow up shortly.", "record": record}


@app.post("/api/demo/run")
def run_demo(payload: DemoRunRequest) -> dict[str, Any]:
    workflow = payload.workflow or "recruitment"
    steps = payload.steps or [
        "Candidate applies",
        "Resume parsed",
        "AI screening",
        "Credential check",
        "Job matching",
        "Recruiter alert",
        "Follow-up",
        "ATS updated",
    ]

    completed_steps = max(1, min(len(steps), 7))
    time_saved_estimate = "6.2 hours / week"
    run = manager.save_demo_run(workflow, "processing", completed_steps, time_saved_estimate)
    return {
        "status": "success",
        "workflow": workflow,
        "completed_steps": completed_steps,
        "total_steps": len(steps),
        "time_saved_estimate": time_saved_estimate,
        "run": run,
        "simulated_data": {
            "workflow_status": "Processing",
            "processing_latency": "~18 sec",
            "exceptions_handled": 3,
            "manual_steps_removed": 7,
        },
    }


@app.get("/api/demo/{workflow}")
def get_demo(workflow: str) -> dict[str, Any]:
    run = manager.get_latest_demo_run(workflow)
    if not run:
        return {
            "workflow": workflow,
            "status": "idle",
            "completed_steps": 0,
            "time_saved_estimate": "0 hours / week",
            "simulated_data": {
                "workflow_status": "Idle",
                "processing_latency": "Waiting",
                "exceptions_handled": 0,
                "manual_steps_removed": 0,
            },
        }
    return {
        "workflow": workflow,
        "status": run["status"],
        "completed_steps": run["completed_steps"],
        "time_saved_estimate": run["time_saved_estimate"],
        "simulated_data": {
            "workflow_status": "Processing",
            "processing_latency": "~18 sec",
            "exceptions_handled": 3,
            "manual_steps_removed": 7,
        },
    }


@app.post("/api/admin/login")
def admin_login(payload: AdminLoginRequest, response: Response) -> dict[str, str]:
    if payload.username != "admin":
        raise HTTPException(status_code=401, detail="Unauthorized")
    if payload.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    slot = str(int(time.time() // 3600))
    digest = hmac.new(ADMIN_SESSION_SECRET.encode(), slot.encode(), hashlib.sha256).hexdigest()
    response.set_cookie(
        key="admin_session",
        value=digest,
        httponly=True,
        samesite="lax",
        secure=False,
        max_age=60 * 60 * 8,
    )
    return {"status": "success", "message": "Authenticated"}


@app.get("/api/admin/contacts")
def admin_contacts(request: Request) -> dict[str, Any]:
    token = request.cookies.get("admin_session")
    if not token:
        raise HTTPException(status_code=401, detail="Unauthorized")

    expected = hmac.new(ADMIN_SESSION_SECRET.encode(), str(int(time.time() // 3600)).encode(), hashlib.sha256).hexdigest()
    if token != expected:
        raise HTTPException(status_code=401, detail="Unauthorized")

    contacts = manager.get_contacts()
    return {"status": "success", "contacts": contacts}
