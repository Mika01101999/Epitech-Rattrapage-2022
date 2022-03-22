import './App.css';
import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Nav, Navbar, Button} from 'react-bootstrap';
import logo from '../src/assets/dashboard-2.svg';
import lottie from 'lottie-web';

function App() {

  const container = useRef(null)
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('./assets/bear.json')
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
        <div className="body_home">
          <h1 className="title_home">Welcome to your life changer Dashboard</h1>
          <div className="App">
            <div className="container" ref={container}></div>
          </div>
          <h1 className="title_home2">What is Dashboard ?</h1> 
          <div className="text_home"> Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br /> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,<br /> when an unknown printer took a galley of type and scrambled it to make a type specimen book.<br /> It has survived not only five centuries, but also the leap into electronic typesetting.</div>
          <div class="row justify-content-center">
            <div class="col-md-auto">
              <Button variant="outline-primary" href="login" >Login</Button>{' '}
            </div>
            <div class="col-md-auto">
              <Button variant="outline-dark" href="register">Register</Button>{' '}
            </div>
          </div>
        </div>
      </container>
    </>
  );
}

export default App;