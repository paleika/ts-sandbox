import React from 'react';
import { Link, useRoute } from 'react-router5';
import { useQuery, ApolloError } from '@apollo/client';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';

import { COUNTRIES } from '../../queries';
import Filters from './filters';
import Country from './country';
import Spinner from '../spinner';

interface CountriesType {
  countries: {
    code: string;
    name: string;
  }[];
}

interface FiltersType {
  continent?: {
    eq: string;
  };
  currency?: {
    regex: string;
  };
}

interface CountriesListProps {
  loading: boolean;
  error?: ApolloError;
  data?: CountriesType;
  activeCode: string | null;
}

const CountriesList = ({ loading, error, data, activeCode }: CountriesListProps) => {
  if (loading) return <Spinner />
  if (error || !data) return <p>Error =(</p>

  if (data.countries.length === 0) return (
    <div>
      <h4>No results found for your request</h4>
      <p>Please adjust the filters and try again</p>
    </div>
  )

  return (
    <ListGroup>
      {data.countries.map(({ code, name }) => (
        <ListGroup.Item
          key={code}
          as={Link}
          routeName="countries.country"
          routeParams={{ code }}
          active={code === activeCode}
          style={{ cursor: "pointer" }}
        >
          {name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

const Countries = () => {
  const { route } = useRoute();
  const countryCode = route.params.code || null;
  const [filter, setFilter] = React.useState<FiltersType>({});
  const { loading, error, data, refetch } = useQuery<CountriesType>(COUNTRIES, {
    variables: { filter },
  });

  return (
    <Container>
      <Filters setFilter={setFilter} refetch={refetch} />
      <Row>
        <Col>
          <CountriesList loading={loading} error={error} data={data} activeCode={countryCode} />
        </Col>
        <Col>
          {route.name === 'countries.country' && <Country code={countryCode} />}
        </Col>
      </Row>
    </Container>
  )
}

export default Countries;
export { COUNTRIES };
