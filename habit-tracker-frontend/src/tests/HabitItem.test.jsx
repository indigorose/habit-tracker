import { render, screen, fireEvent } from '@testing-library/react';
import HabitItem from '../components/HabitItem';
import { test, expect, vi } from 'vitest';

test('renders habit name and streak', () => {
	const habit = { id: 1, name: 'Exercise', streak: 2 };
	render(<HabitItem habit={habit} onHabitUpdated={() => {}} />);

	expect(screen.getByText(/exercise/i)).toBeInTheDocument();
	expect(screen.getByText(/streak: 2/i)).toBeInTheDocument();
});

test('calls onHabitUpdated when Mark Complete is clicked', async () => {
	const habit = { id: 1, name: 'Exercise', streak: 2 };
	const mockUpdate = vi.fn();

	// Mock fetch

	vi.stubGlobal(
		'fetch',
		vi.fn(() =>
			Promise.resolve({
				ok: true,
				json: () =>
					Promise.resolve({ id: 1, name: 'Exercise', streak: 3 }),
			})
		)
	);

	render(<HabitItem habit={habit} onHabitUpdated={mockUpdate} />);
	fireEvent.click(screen.getByRole('button', { name: /mark complete/i }));

	await screen.findByText(/exercise/i);

	expect(mockUpdate).toHaveBeenCalledWith({
		id: 1,
		name: 'Exercise',
		streak: 3,
	});
});
