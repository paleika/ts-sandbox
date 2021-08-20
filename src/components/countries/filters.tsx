import React from 'react';
import { gql, useLazyQuery, OperationVariables } from '@apollo/client';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';

interface ContinentsType {
  continents: {
    code: string;
    name: string;
  }[];
}

interface FiltersProps {
  setFilter: (arg: object) => void;
  refetch: (arg?: object) => Promise<any>;
}

const CONTINENTS = gql`
  query {
    continents {
      code
      name
    }
  }
`;

const Filters = ({ setFilter, refetch }: FiltersProps) => {
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const [continentTarget, currencyTarget] = e.target;
    const continent = continentTarget.value ? { eq: continentTarget.value } : undefined;
    const currency = currencyTarget.value ? { regex: currencyTarget.value } : undefined;
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
                  <Form.Control as="select" className="form-select" onFocus={handleLoadContinents}>
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
                  <Form.Control as="select" className="form-select">
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
