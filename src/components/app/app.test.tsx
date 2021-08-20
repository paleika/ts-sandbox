import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './app';

test('renders header with correct text', () => {
  render(<App />);
  const heading = screen.getByRole('heading');
  expect(heading).toBeInTheDocument();
  expect(heading).toHaveTextContent('Hello, Jane Doe!');
})
