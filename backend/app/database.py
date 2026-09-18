import sqlite3
from datetime import datetime, timezone
from typing import Any

from .config import DATABASE_PATH


class DatabaseManager:
    def __init__(self, db_path: str = DATABASE_PATH) -> None:
        self.db_path = db_path

    def _connect(self) -> sqlite3.Connection:
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        return conn

    def init_db(self) -> None:
        with self._connect() as conn:
            conn.execute(
                """
                CREATE TABLE IF NOT EXISTS contacts (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    work_email TEXT NOT NULL,
                    company TEXT,
                    role TEXT,
                    industry TEXT,
                    current_process TEXT,
                    biggest_time_sink TEXT,
                    created_at TEXT NOT NULL DEFAULT (datetime('now'))
                )
                """
            )
            conn.execute(
                """
                CREATE TABLE IF NOT EXISTS demo_runs (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    workflow TEXT NOT NULL,
                    status TEXT NOT NULL,
                    completed_steps INTEGER NOT NULL,
                    time_saved_estimate TEXT NOT NULL,
                    created_at TEXT NOT NULL DEFAULT (datetime('now'))
                )
                """
            )

    def save_contact(
        self,
        name: str,
        work_email: str,
        company: str,
        role: str,
        industry: str,
        current_process: str,
        biggest_time_sink: str,
    ) -> dict[str, Any]:
        created_at = datetime.now(timezone.utc).isoformat()
        with self._connect() as conn:
            cursor = conn.execute(
                """
                INSERT INTO contacts (name, work_email, company, role, industry, current_process, biggest_time_sink, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    name,
                    work_email,
                    company,
                    role,
                    industry,
                    current_process,
                    biggest_time_sink,
                    created_at,
                ),
            )
            contact_id = cursor.lastrowid
        return {
            "id": contact_id,
            "name": name,
            "work_email": work_email,
            "company": company,
            "role": role,
            "industry": industry,
            "current_process": current_process,
            "biggest_time_sink": biggest_time_sink,
            "created_at": created_at,
        }

    def get_contacts(self) -> list[dict[str, Any]]:
        with self._connect() as conn:
            rows = conn.execute(
                "SELECT * FROM contacts ORDER BY created_at DESC"
            ).fetchall()
        return [dict(row) for row in rows]

    def save_demo_run(
        self,
        workflow: str,
        status: str,
        completed_steps: int,
        time_saved_estimate: str,
    ) -> dict[str, Any]:
        created_at = datetime.now(timezone.utc).isoformat()
        with self._connect() as conn:
            cursor = conn.execute(
                """
                INSERT INTO demo_runs (workflow, status, completed_steps, time_saved_estimate, created_at)
                VALUES (?, ?, ?, ?, ?)
                """,
                (workflow, status, completed_steps, time_saved_estimate, created_at),
            )
            demo_id = cursor.lastrowid
        return {
            "id": demo_id,
            "workflow": workflow,
            "status": status,
            "completed_steps": completed_steps,
            "time_saved_estimate": time_saved_estimate,
            "created_at": created_at,
        }

    def get_latest_demo_run(self, workflow: str) -> dict[str, Any] | None:
        with self._connect() as conn:
            row = conn.execute(
                """
                SELECT * FROM demo_runs WHERE workflow = ? ORDER BY created_at DESC LIMIT 1
                """,
                (workflow,),
            ).fetchone()
        return dict(row) if row else None


manager = DatabaseManager()
