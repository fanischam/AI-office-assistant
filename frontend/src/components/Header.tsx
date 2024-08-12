import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../assets/logodark.svg';
import Logo from './Logo';

// interface NavbarProps {
//   isLoggedIn: boolean;
//   onLogout: () => void;
// }

const Header: React.FC = () => {
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <Logo logoSrc={logo} />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to='/chat'>
                <Nav.Link className='me-3 fs-4 text-light'>Chat</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/login'>
                <Nav.Link className='me-3 fs-4 text-light'>Login</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/register'>
                <Nav.Link className='me-3 fs-4 text-light'>Register</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
