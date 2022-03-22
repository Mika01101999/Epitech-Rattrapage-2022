import React, { useEffect, useRef, useState } from 'react';
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {Container, Nav, Navbar, Form, Card, Row, Col } from 'react-bootstrap';
import './App.css';
import { auth } from "./firebaseConfig";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import logo from '../src/assets/dashboard-2.svg';
import lottie from 'lottie-web';

function Register() { 
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      if (user) {
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
      animationData: require('./assets/register.json')
    })
  }, [])

  //front
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
              <Card.Header>Register</Card.Header>
                <Card.Body>
                  <Form.Control
                      id="floatingInputCustom"
                      type="email"
                      placeholder="Email..."
                      onChange={(event) => {
                        setRegisterEmail(event.target.value);
                      } } 
                    />
                    <div className="inpt"/>
                    <Form.Control
                      id="floatingInputCustom"
                      type="password"
                      placeholder="Password"
                      onChange={(event) => {
                        setRegisterPassword(event.target.value);
                      } }
                    />
                  <Row className="login_a">
                    <Col></Col>
                    <Col>
                    <Button onClick={register}> Create User</Button>
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
              <div className="container3"  ref={container}></div>
            </div>
          </container>
        </div>
    </>
  );
}

export default Register