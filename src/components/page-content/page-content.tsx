import React from 'react';
import { useRoute } from 'react-router5';

import MainPage from '../main-page';
import CountriesList from '../countries/countries-list';
import NotFound from '../not-found';

const PageContent = () => {
  const { route } = useRoute();
  const topRouteName = route.name.split('.')[0];

  if (topRouteName === 'main') {
    return <MainPage />
  }

  if (topRouteName === 'countries') {
    return <CountriesList />
  }

  return <NotFound />
}

export default PageContent;
