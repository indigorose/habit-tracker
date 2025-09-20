import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, test, expect } from 'vitest';
import HabitList from '../components/HabitList';

const sampleHabits = [
	{ id: 1, name: 'Exercise', streak: 2 },
	{ id: 2, name: 'Read', streak: 5 },
];

test('renders all habits', () => {
	render(<HabitList habits={sampleHabits} onHabitUpdated={() => {}} />);

	expect(screen.getByText(/exercise/i)).toBeInTheDocument();
	expect(screen.getByText(/read/i)).toBeInTheDocument();
});

test("updates habit when 'Mark Complete' is clicked", async () => {
	const mockUpdate = vi.fn();

	vi.stubGlobal(
		'fetch',
		vi.fn(() =>
			Promise.resolve({
				ok: true,
				json: () =>
					Promise.resolve({
						id: 1,
						name: 'Exercise',
						streak: 3,
					}),
			})
		)
	);

	render(<HabitList habits={sampleHabits} onHabitUpdated={mockUpdate} />);

	fireEvent.click(
		screen.getAllByRole('button', { name: /mark complete/i })[0]
	);

	await waitFor(() => {
		expect(mockUpdate).toHaveBeenCalledWith({
			id: 1,
			name: 'Exercise',
			streak: 3,
		});
	});
});
