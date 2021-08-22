import React from 'react';
import configureRouter from '../../utils/create-router';
import { RouterProvider } from 'react-router5';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import fetch from 'cross-fetch';

import Header from '../header';
import Breadcrumbs from '../breadcrumbs';
import PageContent from '../page-content';

const router = configureRouter();
router.start();

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://countries.trevorblades.com',
    fetch,
  }),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <RouterProvider router={router}>
      <ApolloProvider client={client}>
        <Header />
        <Breadcrumbs />
        <PageContent />
      </ApolloProvider>
    </RouterProvider>
  )
}

export default App;
