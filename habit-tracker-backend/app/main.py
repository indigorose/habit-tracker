from fastapi import FastAPI
from app.models import Habit

app = FastAPI()

# In-memory "database"
habits = []


@app.get("/")
def read_root():
    return {"message": "Habit Tracker API is running!"}


@app.get("/habits")
def get_habits():
    return habits
