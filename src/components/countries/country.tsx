import React from 'react';
import { useQuery } from '@apollo/client';
import { Card } from 'react-bootstrap';

import { COUNTRY } from '../../queries';
import Spinner from '../spinner';

import './country.css';

interface CountryType {
  country: {
    name: string;
    phone: string;
    currency: string;
    capital: string;
    languages: { name: string; }[];
    emoji: string;
    continent: {
      code: string;
      name: string;
    }
  }
}

interface CountryProps {
  code: string;
}

const Country = ({ code }: CountryProps) => {
  const { loading, error, data } = useQuery<CountryType>(COUNTRY, {
    variables: { code },
  });

  let content;

  if (loading) {
    content = <Spinner />
  } else if (error || !data) {
    content = <p>Error =(</p>
  } else {
    const { country: { name, emoji, continent, capital, currency, phone, languages } } = data;
    content = (
      <Card.Body>
        <Card.Title>{name} {emoji}</Card.Title>
        <Card.Subtitle className="text-muted mb-2">{continent.name}</Card.Subtitle>
        <ul className="list-unstyled">
          <li>Capital: {capital}</li>
          <li>Currency: {currency}</li>
          <li>Phone code: {phone}</li>
          <li>Languages: {languages.map((item) => item.name).join(', ')}</li>
        </ul>
      </Card.Body>
    )
  }

  return (
    <Card className="country-sticky-card">
      {content}
    </Card>
  )
}
// other countries of this continent

export default Country;
export { COUNTRY };
