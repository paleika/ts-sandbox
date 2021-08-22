import React from 'react';
import { useLazyQuery, OperationVariables } from '@apollo/client';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';

import { CONTINENTS } from '../../queries';

interface ContinentsType {
  continents: {
    code: string;
    name: string;
  }[];
}

interface ContinentFilter {
  eq: string;
}

interface CurrencyFilter {
  regex: string;
}

interface FiltersProps {
  setFilter: (arg: object) => void;
  refetch: (arg?: object) => Promise<any>;
}

const Filters = ({ setFilter, refetch }: FiltersProps) => {
  const [continent, setContinent] = React.useState<ContinentFilter | undefined>(undefined);
  const [currency, setCurrency] = React.useState<CurrencyFilter | undefined>(undefined);
  const [continentOptions, setContinentOptions] = React.useState<ContinentsType | null>(null);
  const [loadContinents, { data: continentsData }] = useLazyQuery<ContinentsType, OperationVariables>(CONTINENTS);

  React.useEffect(() => {
    setContinentOptions(continentsData || null);
  }, [continentsData])

  const handleLoadContinents = () => {
    if (continentOptions === null) {
      loadContinents();
    }
  }

  const handleContinentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const continentValue = e.target.value;
    if (continentValue === '') {
      setContinent(undefined);
    } else {
      setContinent({ eq: continentValue })
    }
  }

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const currencyValue = e.target.value;
    if (currencyValue === '') {
      setCurrency(undefined);
    } else {
      setCurrency({ regex: currencyValue })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilter({ continent, currency });
    refetch()
  }

  return (
    <Row className="mb-3">
      <Col>
        <Card>
          <Card.Header>Filters</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row className="align-items-end">
                <Col xs={5}>
                  <Form.Control as="select" className="form-select" onFocus={handleLoadContinents} onChange={handleContinentChange}>
                    <option value={''}>Choose continent...</option>
                    {continentOptions === null
                      ? <option className="text-muted">Loading options...</option>
                      : (
                        <>
                          {continentOptions.continents.map(({ code, name }) => (
                            <option key={code} value={code}>{name}</option>
                          ))}
                        </>
                      )
                    }
                  </Form.Control>
                </Col>
                <Col xs={5}>
                  <Form.Control as="select" className="form-select" onChange={handleCurrencyChange}>
                    <option value={''}>Choose currency...</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="USD">USD</option>
                  </Form.Control>
                </Col>
                <Col className="align-items-end">
                  <Button type="submit">Apply</Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
};

export default Filters;
export { CONTINENTS };
