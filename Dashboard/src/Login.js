import React, { useEffect, useRef } from 'react';
import {Container, Nav, Navbar, Form, Card, Row, Col } from 'react-bootstrap';
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebaseConfig";
import logo from '../src/assets/dashboard-2.svg';
import lottie from 'lottie-web';

export default function LoginPage() {

const [loginEmail, setLoginEmail] = useState("");
const [loginPassword, setLoginPassword] = useState("");

const login = async () => {
  try {
    const user = await signInWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
    if (auth.currentUser) {
      window.location.href = "/dashboard"
    }
    else {
      window.location.href = "/register"
    }
    console.log(user);
  } catch (error) {
    console.log(error.message);
  }
};

const container = useRef(null)
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('./assets/login.json')
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
              alt="Logo for the Dashboard"
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
        <div className="body_home">
          <Row className="log_form">
            <Col></Col>
            <Col>
              <Card border="primary"className="mb-2" style={{ width: '30rem' }}>
              <Card.Header>Login</Card.Header>
                <Card.Body>
                  <Form.Control
                      id="floatingInputCustom"
                      type="email"
                      placeholder="Email..."
                      onChange={(event) => {
                        setLoginEmail(event.target.value);
                      }}
                    />
                    <div className="inpt"/>
                    <Form.Control
                      id="floatingInputCustom"
                      type="password"
                      placeholder="Password"
                      onChange={(event) => {
                        setLoginPassword(event.target.value);
                      }}
                    />
                  <Row className="login_a">
                    <Col></Col>
                    <Col>
                      <Button variant="outline-primary" onClick={login}> Click to login</Button>
                    </Col>
                    <Col></Col>
                  </Row>
                </Card.Body>
              </Card>
              </Col>
            <Col>
            </Col>
          </Row>
          <container>
            <div >
              <div className="container2"  ref={container}></div>
            </div>
          </container>
        </div>
      </>
    );
  }
