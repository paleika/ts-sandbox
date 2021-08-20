import React from 'react';
import { Link } from 'react-router5';
import { Navbar, Container, Nav } from 'react-bootstrap';
import Logo from './logo';

const Header = () => {
  return (
    <Navbar sticky="top" variant="dark" bg="primary">
      <Container>
        <Navbar.Brand as={Logo} />
        <Nav>
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
