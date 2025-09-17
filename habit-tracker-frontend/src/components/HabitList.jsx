import HabitItem from './HabitItem';

function HabitList({ habits, onHabitUpdated }) {
	return (
		<ul>
			{habits.map((habit) => (
				<HabitItem
					key={habit.id}
					habit={habit}
					onHabitUpdated={onHabitUpdated}
				/>
			))}
		</ul>
	);
}

export default HabitList;
