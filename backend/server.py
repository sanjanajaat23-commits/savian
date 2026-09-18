"""Compatibility entrypoint for running the STRADEXI API from the backend folder.

This keeps the documented `uvicorn server:app` command working while the
implementation remains organized under the `app` package.
"""

from app.main import app

__all__ = ["app"]
