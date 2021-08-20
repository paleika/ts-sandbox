import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

import Header from '../header';
import Breadcrumbs from '../breadcrumbs';
// import MainPage from '../main-page';
import CountriesList from '../countries/countries-list';

const App = () => {
  const client = new ApolloClient({
    uri: 'https://countries.trevorblades.com',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Header />
      <Breadcrumbs />
      {/* <MainPage /> */}
      <CountriesList />
    </ApolloProvider>
  )
}


export default App;
