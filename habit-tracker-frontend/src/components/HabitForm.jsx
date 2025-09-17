import { useState } from 'react';

function HabitForm({ onHabitCreated }) {
	const [name, setName] = useState('');
	const [frequency, setFrequency] = useState('daily');
	const handleSubmit = async (e) => {
		e.preventDefault();

		const res = await fetch('http://127.0.0.1:8000/habits', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, frequency }),
		});

		if (res.ok) {
			const newHabit = await res.json();
			onHabitCreated(newHabit);
			setName('');
			setFrequency('daily');
		}
	};

	return (
		<form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
			<input
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder="Habit name"
				required
			/>
			<select
				value={frequency}
				onChange={(e) => setFrequency(e.target.value)}
			>
				<option value="daily">Daily</option>
				<option value="weekly">Weekly</option>
			</select>
			<button type="submit">Add Habit</button>
		</form>
	);
}

export default HabitForm;
