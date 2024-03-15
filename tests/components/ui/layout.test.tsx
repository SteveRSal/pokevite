import { describe, test, expect } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Layout } from '@/components/ui/layout';

describe('DefaultLayout', () => {
  test('Should Render', async () => {
    const { getByRole } = render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(getByRole('layout')).toBeDefined();
    });
  });
});
