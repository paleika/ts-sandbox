import React from 'react';
import { Link, useRoute } from 'react-router5';
import { Navbar, Container, Nav } from 'react-bootstrap';
import Logo from './logo';

const Header = () => {
  const { route } = useRoute();
  const topRouteName = route.name.split('.')[0];

  return (
    <Navbar sticky="top" variant="dark" bg="primary">
      <Container>
        <Navbar.Brand as={Link} routeName="main">
          <Logo />
        </Navbar.Brand>
        <Nav activeKey={topRouteName}>
          <Nav.Item>
            <Nav.Link as={Link} routeName="main">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} routeName="countries">Countries</Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  )
};

export default Header;
