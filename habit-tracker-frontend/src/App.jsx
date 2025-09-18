import { useEffect, useState } from 'react';
import HabitForm from './components/HabitForm';
import HabitList from './components/HabitList';
import './app.css';

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
		<div className="min-h-screen bg-gray-100 flex items-center justify-center">
			<div className="w-full max-w-xl bg-white shadow-md rounded-xl p-6">
				<h1 className="text-2xl font-bold mb-4 text-center">
					Habit Tracker
				</h1>
				<HabitForm onHabitCreated={handleHabitCreated} />
				<HabitList
					habits={habits}
					onHabitUpdated={handleHabitUpdated}
				/>
			</div>
		</div>
	);
}

export default App;
