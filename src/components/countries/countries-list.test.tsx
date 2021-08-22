import React from 'react';
import { render, screen, act, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RouterProvider } from 'react-router5';
import configureRouter from '../../utils/create-router';

import { MockedProvider } from '@apollo/client/testing';

import Countries, { COUNTRIES } from './countries-list';
import { CONTINENTS } from './filters';

const mocks = [
  {
    request: {
      query: COUNTRIES,
      variables: { filter: {} },
    },
    result: {
      data: {
        countries: [
          {
            name: 'Belarus',
            code: 'BY'
          },
          {
            name: 'Ukraine',
            code: 'UA',
          },
        ]
      }
    }
  },
  {
    request: {
      query: CONTINENTS,
    },
    result: {
      data: {
        continents: [
          {
            code: 'EU',
            name: 'Europe',
          },
          {
            code: 'AS',
            name: 'Asia',
          }
        ]
      }
    }
  }
];


const setup = () => {
  const router = configureRouter().start();

  return render(
    <RouterProvider router={router}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <Countries />
      </MockedProvider>
    </RouterProvider>
  )
}

test('renders list of countries', async () => {
  setup();
  await act(() => new Promise(resolve => setTimeout(resolve, 0)));

  const list = screen.getAllByRole('link');
  expect(list).toHaveLength(2);
  expect(list[0]).toHaveTextContent('Belarus');
  expect(list[1]).toHaveTextContent('Ukraine');
});

test('renders spinner while fetching data', () => {
  setup();
  const spinner = screen.getByTestId('spinner');
  expect(spinner).toBeInTheDocument();
});

test('renders error when bad request', async () => {
  setup();

  const filters = screen.getAllByRole('combobox');
  userEvent.selectOptions(filters[1], 'USD');
  userEvent.click(screen.getByRole('button', { name: 'Apply' }));
  await act(() => new Promise(resolve => setTimeout(resolve, 0)));

  expect(screen.getByText(/Error/)).toBeInTheDocument();
  expect(screen.queryByText('Belarus')).not.toBeInTheDocument();
});

test('loads list of options on combobox focus', async () => {
  setup();

  const continentFilter = screen.getAllByRole('combobox')[0];
  continentFilter.focus();
  await act(() => new Promise(resolve => setTimeout(resolve, 0)));

  const tempOption = await waitFor(() => screen.queryByText('Loading options...'));
  expect(tempOption).not.toBeInTheDocument();

  const options = within(continentFilter).getAllByRole('option');
  expect(options).toHaveLength(3);
  expect(options[1]).toHaveTextContent('Europe');
  expect(options[2]).toHaveTextContent('Asia');
});
