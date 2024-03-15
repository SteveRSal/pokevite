import { describe, test, expect } from 'vitest';
import { render, waitFor } from '@testing-library/react';

import { App } from '@/app';

describe('App', () => {
  test('Should Render', async () => {
    const { getByRole } = render(<App />);

    await waitFor(() => {
      expect(getByRole('layout')).toBeDefined();
    });
  });
});
