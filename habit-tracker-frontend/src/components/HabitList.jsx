import HabitItem from './HabitItem';
import '../app.css';

function HabitList({ habits, onHabitUpdated }) {
	return (
		<ul className="divide-y divide-gray-200">
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
