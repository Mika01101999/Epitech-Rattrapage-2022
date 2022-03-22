import './App.css';
import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Nav, Navbar} from 'react-bootstrap';
import logo from '../src/assets/dashboard-2.svg';
import lottie from 'lottie-web';

function Error404() {

  const container = useRef(null)
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('./assets/avocado.json')
    })
  }, [])

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container >
          <Navbar.Brand href="/" className="navbar">
          <img
            className="nav"
            src={logo}
            width="30"
            height="30"
            alt="Logo for the navbar"
          />{' '}
            Dashboard
          </Navbar.Brand>
            <Nav>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="login">Login</Nav.Link>
              <Nav.Link href="register">Register</Nav.Link>
            </Nav>
        </Container>
      </Navbar>
      <container>
        <div className="App">
          <div className="container1" ref={container}></div>
        </div>
      </container>
    </>
  );
}

export default Error404;