import { createBrowserRouter } from 'react-router-dom';

import { HOME_PATH } from '@/constants/routes';

import { Layout } from '@/components/ui/layout';

export const router = createBrowserRouter(
  [
    {
      id: 'root',
      path: '/',
      Component: Layout,
      children: [
        {
          index: true,
          id: 'home',
          path: HOME_PATH,
          lazy: () => import('./pages/home'),
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);
