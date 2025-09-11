from fastapi import FastAPI, HTTPException
from app.models import Habit
from app.services import mark_habit_complete

app = FastAPI()

# In-memory "database"
habits: list[Habit] = []


@app.get("/")
def read_root():
    return {"message": "Habit Tracker API is running!"}


@app.get("/habits")
def get_habits():
    return habits


# POST endpoint(create habit)
@app.post("/habits")
def create_habit(habit: Habit):
    habits.append(habit.model_dump())
    return habit


# get POST by ID
@app.get("/habits/{habit_id}")
def get_habit(habit_id: int):
    for habit in habits:
        if habit.id == habit_id:
            return habit.completed
    return {"error": "Habit not found"}


# PUT - update a habit
@app.put("/habits/{habit_id}")
def update_habit(habit_id: int, updated_habit: Habit):
    for i, h in enumerate(habits):
        if h.id == habit_id:
            habits[i] = updated_habit
            return updated_habit
    return {"error": "Habit not found"}


# Delete a post
@app.delete("/habits/{habit_id}")
def delete_habit(habit_id: int):
    for i, h in enumerate(habits):
        if h.id == habit_id:
            return habits.pop(i)
    return {"error": "Habit not found"}


@app.post("/habits/{habit_id}/complete")
def complete_habit(habit_id: int):
    for h in habits:
        if h['id'] == habit_id:
            habit = Habit(**h)
            updated = mark_habit_complete(habit)
            h.update(updated.model_dump())
            return updated
    raise HTTPException(status_code=404, detail="Habit not found")
