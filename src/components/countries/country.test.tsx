import React from 'react';
import { render, screen, act } from '@testing-library/react';

import { RouterProvider } from 'react-router5';
import configureRouter from '../../utils/create-router';

import { MockedProvider } from '@apollo/client/testing';

import Country, { COUNTRY } from './country';

const mocks = [
  {
    request: {
      query: COUNTRY,
      variables: {
        code: 'BY',
      },
    },
    result: {
      data: {
        country: {
          name: 'Belarus',
          phone: '+375',
          currency: 'BYN',
          capital: 'Minsk',
          languages: [
            { name: 'Belarussian' },
            { name: 'Russian' },
          ],
          emoji: '',
          continent: {
            name: 'Europe',
            code: 'EU',
          }
        }
      }
    }
  },
  {
    request: {
      query: COUNTRY,
      variables: {
        code: 'UA',
      },
    },
    error: new Error('There is an error!'),
  },
];

const setup = (code: string) => {
  const router = configureRouter().start();

  return render(
    <RouterProvider router={router}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <Country code={code} />
      </MockedProvider>
    </RouterProvider>
  );
}

test('renders country name', async () => {
  setup("BY");
  await act(() => new Promise(resolve => setTimeout(resolve, 0)));

  expect(screen.getByText('Belarus')).toBeInTheDocument();
});

test('renders spinner while fetching data', () => {
  setup("BY");
  expect(screen.getByTestId('spinner')).toBeInTheDocument();
});

test('renders error message for bad request', async () => {
  setup("UA");
  await act(() => new Promise(resolve => setTimeout(resolve, 0)));

  expect(screen.getByText(/Error/)).toBeInTheDocument();
  expect(screen.queryByText('Capital')).not.toBeInTheDocument();
});
