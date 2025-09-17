import { useEffect, useState } from 'react';
import HabitForm from './components/HabitForm';
import HabitList from './components/HabitList';

function App() {
	const [habits, setHabits] = useState([]);

	const fetchHabits = async () => {
		const res = await fetch('http://127.0.0.1:8000/habits');
		if (res.ok) {
			const data = await res.json();
			setHabits(data);
		}
	};
	useEffect(() => {
		fetchHabits();
	}, []);

	const handleHabitCreated = (newHabit) => {
		setHabits([...habits, newHabit]);
	};
	const handleHabitUpdated = (updatedHabit) => {
		setHabits(
			habits.map((h) => (h.id === updatedHabit.id ? updatedHabit : h))
		);
	};

	return (
		<div style={{ padding: '2rem' }}>
			<h1>Habit Tracker</h1>
			<HabitForm onHabitCreated={handleHabitCreated} />
			<HabitList habits={habits} onHabitUpdated={handleHabitUpdated} />
		</div>
	);
}

export default App;
