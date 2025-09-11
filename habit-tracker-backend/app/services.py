from datetime import date
from app.models import Habit


def mark_habit_complete(habit: Habit) -> Habit:
    today = date.today().isoformat()

    if habit.last_completed == today:
        return habit

    if habit.last_completed is None:
        habit.streak = 1
    else:
        try:
            last_date = date.fromisoformat(habit.last_completed)
            delta = (date.today() - last_date).days
            if delta == 1:
                habit.streak += 1
            else:
                habit.streak = 1
        except Exception:
            habit.streak = 1

    habit.last_completed = today
    return habit
