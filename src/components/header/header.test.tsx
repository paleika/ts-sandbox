import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RouterProvider } from 'react-router5';
import configureRouter from '../../utils/create-router';

import Header from './header';

const setup = (routeName?: string) => {
  const router = configureRouter().start();
  if (routeName) {
    router.navigate(routeName)
  };

  return render(
    <RouterProvider router={router}>
      <Header />
    </RouterProvider>
  );
}

test('renders without error', () => {
  setup();
  const header = screen.getByRole('navigation');
  expect(header).toBeInTheDocument();
});

test('logo leads to the root page', () => {
  setup('countries');
  const logo = screen.getByRole('link', { name: 'P' });
  userEvent.click(logo);
  expect(window.location.pathname).toEqual('/');
});
