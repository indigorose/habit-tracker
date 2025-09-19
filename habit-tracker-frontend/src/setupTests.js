import '@testing-library/jest-dom';
import 'whatwg-fetch';

import { afterEach, vi } from 'vitest';

afterEach(() => {
	vi.restoreAllMocks();
});
