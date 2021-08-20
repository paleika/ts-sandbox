import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import Logo from './logo';

const Header = () => {
  return (
    <Navbar sticky="top" variant="dark" bg="primary">
      <Container>
        <Navbar.Brand as={Logo} />
        <Nav>
          <Nav.Item>
            <Nav.Link eventKey="link-home">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-planets">Countries</Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  )
};

export default Header;
