import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './app';

test('renders app with a header', () => {
  render(<App />);
  const heading = screen.getByRole('heading');
  expect(heading).toBeInTheDocument();
})
