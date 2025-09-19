import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, test, expect } from 'vitest';
import HabitForm from '../components/HabitForm';

test('renders input and button', () => {
	render(<HabitForm onHabitCreated={() => {}} />);

	// Input and button should exist
	expect(screen.getByPlaceholderText(/habit name/i)).toBeInTheDocument();
	expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
});

test('calls onHabitCreated after submit', async () => {
	const mockCreate = vi.fn();

	// Mock fetch
	vi.stubGlobal(
		'fetch',
		vi.fn(() =>
			Promise.resolve({
				ok: true,
				json: () =>
					Promise.resolve({ id: 1, name: 'Drink Water', streak: 0 }),
			})
		)
	);

	render(<HabitForm onHabitCreated={mockCreate} />);

	fireEvent.change(screen.getByPlaceholderText(/habit name/i), {
		target: { value: 'Drink Water' },
	});
	fireEvent.click(screen.getByRole('button', { name: /add/i }));

	// ✅ Wait until onHabitCreated is called
	await waitFor(() => {
		expect(mockCreate).toHaveBeenCalledWith({
			id: 1,
			name: 'Drink Water',
			streak: 0,
		});
	});
});
