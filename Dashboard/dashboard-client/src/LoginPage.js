import {Container, Nav, Navbar, Card, Row, Col } from 'react-bootstrap';
import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { app } from "./firebaseConfig";
import logo from '../src/assets/dashboard-2.svg';
import lottie from 'lottie-web';
import React, { useEffect, useRef,useState} from 'react';

export default function LoginPage() {

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

  const [isSigned, setInSigned] = useState(false)
  
  const uiConfig = {
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
          signInSuccess: () => false
      }

  }

  useEffect(() => {
    app.auth().onAuthStateChanged(user => {
      setInSigned(user)
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
                <div>
                  {isSigned ? (
                      window.location.href = "/dashboard"
                  ) : (
                    <StyledFirebaseAuth
                      uiConfig = {uiConfig}
                      firebaseAuth={app.auth()}
                    />
                    )
                  }
                </div>
                  <Row className="login_a">
                    <Col></Col>
                    <Col>
                      {/* <Button variant="outline-primary" onClick={Login}> Click to login</Button> */}
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