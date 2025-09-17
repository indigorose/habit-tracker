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
		<li>
			{habit.name} - streak: {habit.streak}
			<button onClick={handleComplete} style={{ marginLeft: '1rem' }}>
				Mark Complete
			</button>
		</li>
	);
}

export default HabitItem;
