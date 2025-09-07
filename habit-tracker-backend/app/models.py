from pydantic import BaseModel
from typing import Optional


class Habit(BaseModel):
    id: int
    name: str
    frequency: str  # e.g. "daily", "weekly"
    streak: int = 0
    last_completed: Optional[str] = None  # ISO date string
