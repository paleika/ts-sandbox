import React from 'react';
import { useRouter } from 'react-router5';
import { Card, Col, Container, Row } from 'react-bootstrap';
import image from '../../assets/belarus.png';

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
  const router = useRouter();

  const handleClick = () => router.navigate('countries.country', { code: "BY" });

  return (
    <Card>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>Belarus</Card.Title>
        <Card.Text>
          Belarus, officially the Republic of Belarus, is a landlocked country in Eastern Europe.
        </Card.Text>
        <Card.Link onClick={handleClick}>See more</Card.Link>
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
