import '../app.css';

function HabitItem({ habit, onHabitUpdated }) {
	const handleComplete = async () => {
		const res = await fetch(
			`http://127.0.0.1:8000/habits/${habit.id}/complete`,
			{
				method: 'POST',
			}
		);

		if (res.ok) {
			const updated = await res.json();
			onHabitUpdated(updated);
		}
	};

	return (
		<li className="flex justify-between items-center p-2 border-b">
			<span>
				{habit.name} –{' '}
				<span className="text-gray-500">streak: {habit.streak}</span>
			</span>
			<button
				onClick={handleComplete}
				className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
			>
				Mark Complete
			</button>
		</li>
	);
}

export default HabitItem;
