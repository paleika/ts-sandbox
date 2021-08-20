import React from 'react';
import { gql, useQuery, ApolloError } from '@apollo/client';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
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
  setActiveCode: (arg: string) => void;
}

interface CountriesProps {
  activeCountry?: string;
}

const COUNTRIES = gql`
  query($filter: CountryFilterInput) {
    countries(filter: $filter) {
      code
      name
    }
  }
`;

const CountriesList = ({ loading, error, data, activeCode, setActiveCode }: CountriesListProps) => {
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
          active={code === activeCode}
          style={{ cursor: "pointer" }}
          onClick={() => setActiveCode(code)}
        >
          {name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

const Countries = ({ activeCountry }: CountriesProps) => {
  const [activeCode, setActiveCode] = React.useState(activeCountry || null);
  const [filter, setFilter] = React.useState<FiltersType>({});
  const { loading, error, data, refetch } = useQuery<CountriesType>(COUNTRIES, {
    variables: { filter },
  });

  return (
    <Container>
      <Filters setFilter={setFilter} refetch={refetch} />
      <Row>
        <Col>
          <CountriesList loading={loading} error={error} data={data} activeCode={activeCode} setActiveCode={setActiveCode} />
        </Col>
        <Col>
          {activeCode && <Country code={activeCode} />}
        </Col>
      </Row>
    </Container>
  )
}

export default Countries;
