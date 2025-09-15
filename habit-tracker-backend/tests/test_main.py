from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_create_habit():
    response = client.post("/habits", json={

        "name": "Drink Water",
        "frequency": "daily",

    })
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Drink Water"
    assert data["streak"] == 0


def test_duplicate_habit_name():
    '''Check for the drink water habit'''
    response = client.post("/habits", json={
        "name": "Drink Water",
        "frequency": "daily",
    })

    assert response.status_code == 400
    assert response.json()["detail"] == "Habit already exists."


def test_get_habits():
    response = client.get("/habits")
    assert response.status_code == 200
    data = response.json()
    assert len(data) > 0


def test_complete_existing_habit():
    # Mark habit as complete
    response = client.post("/habits/1/complete")
    assert response.status_code == 200
    data = response.json()
    assert data["streak"] >= 1


def test_complete_nonexistent_habit():
    response = client.post("/habits/999/complete")
    assert response.status_code == 404
    assert response.json()["detail"] == "Habit not found"
