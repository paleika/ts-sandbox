import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import image from '../../assets/belarus.png';
import Country from '../countries/country';

const MainContent = () => (
  <div>
    <h2>TS pet</h2>
    <p>
      This is a pet project made with Typescript and React to test
      some new features before using them at work. It is connected
      to Apollo Countries API and uses React-Bootstrap as a UI library.
    </p>
  </div>
)

const SidebarCard = () => {
  const [call, setCall] = React.useState(false);

  if (call) return <Country code="BY" />

  return (
    <Card>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>Belarus</Card.Title>
        <Card.Text>
          Belarus, officially the Republic of Belarus, is a landlocked country in Eastern Europe.
        </Card.Text>
        <Card.Link onClick={() => setCall(true)}>See more</Card.Link> // TODO: go to country page on click
      </Card.Body>
    </Card>
  )
}

const MainPage = () => {
  return (
    <Container>
      <Row>
        <Col xs={12} md={8}><MainContent /></Col>
        <Col xs={6} md={4}><SidebarCard /></Col>
      </Row>
    </Container>
  )
};

export default MainPage;
