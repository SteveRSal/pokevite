import { describe, test, expect } from 'vitest';
import { render, waitFor } from '@testing-library/react';

import { Component } from '@/pages/home';

describe('HomePage', () => {
  test('Should Render', async () => {
    const { getByRole } = render(<Component />);

    await waitFor(() => {
      expect(getByRole('main')).toBeDefined();
    });
  });
});
