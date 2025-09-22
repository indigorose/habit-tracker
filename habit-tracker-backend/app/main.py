from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.models import Habit, HabitCreate
from app.services import mark_habit_complete

app = FastAPI()

# In-memory "database"
habits: list[Habit] = []
next_id = 1

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://habit-tracker-five-tau.vercel.app/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# POST endpoint(create habit)


@app.post("/habits", response_model=Habit)
def create_habit(habit_in: HabitCreate):
    global next_id
    '''Check for duplicate habits'''
    if any(h["name"] == habit_in.name for h in habits):
        raise HTTPException(status_code=400, detail="Habit already exists.")
    habit = Habit(id=next_id, **habit_in.model_dump())
    next_id += 1
    habits.append(habit.model_dump())
    return habit


'''Get list of habits'''


@app.get("/habits", response_model=list[Habit])
def get_habits():
    return habits


# get POST by ID
@app.get("/habits/{habit_id}", response_model=Habit)
def get_habit(habit_id: int):
    for h in habits:
        if h.id == habit_id:
            habit = Habit(**h)
            updated = mark_habit_complete(habit)
            return updated
    raise HTTPException(status_code=404, detail='Habit not found')


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
