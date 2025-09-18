import { useState } from 'react';
import '../app.css';

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
		<form onSubmit={handleSubmit} className="flex gap-2 mb-4">
			<input
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder="Habit name"
				required
				className="flex-1 border rounded-lg px-3 py-2"
			/>
			<select
				value={frequency}
				onChange={(e) => setFrequency(e.target.value)}
				className="border rounded-lg px-2 py-2"
			>
				<option value="daily">Daily</option>
				<option value="weekly">Weekly</option>
			</select>
			<button
				type="submit"
				className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
			>
				Add
			</button>
		</form>
	);
}

export default HabitForm;
