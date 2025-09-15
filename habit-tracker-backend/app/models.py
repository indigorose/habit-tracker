from pydantic import BaseModel
from typing import Optional


'''Base class for habits'''


class HabitBase(BaseModel):
    name: str
    frequency: str


'''A class to use when creating a habit'''


class HabitCreate(HabitBase):
    pass


class Habit(HabitBase):
    id: int
    streak: int = 0
    last_completed: Optional[str] = None

    class Config:
        from_attributes = True
