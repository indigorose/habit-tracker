import { useEffect, useState } from 'react';

function App() {
	const [habits, setHabits] = useState([]);
	useEffect(() => {
		fetch('http://127.0.0.1:8000/habits')
			.then((res) => res.json())
			.then((data) => setHabits(data));
	}, []);
	return (
		<div style={{ padding: '2rem' }}>
			<h1>Habit Tracker</h1>
			<ul>
				{habits.map((habit) => (
					<li key={habit.id}>
						{habit.name} - streak: {habit.streak}
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;
