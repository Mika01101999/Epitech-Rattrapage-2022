import React, { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import logo1 from "../assets/pin.svg";

const GeolocaWidget = () => {


  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      <p>Geolocation ne marche pas sur votre navigateur</p>
    }
  }
  
  const showPosition = (position) => {
    setLatitude(position.coords.latitude)
    setLongitude(position.coords.longitude)
  }
  

    return (
      <div >
        <Card style={{ width: '39rem', height: '20rem' , backgroundColor: '#ececec'}}>
          <Card.Img variant="top-left" src={logo1} width="50"
            height="50" align="left"/>
          <Card.Body>
            <Card.Title>Geolocation</Card.Title>
            <Card.Text>
              latitude: {latitude}
            </Card.Text>
            <Card.Text>
              longitude: {longitude}
            </Card.Text>
            <button
                onClick={() => {
                  getLocation();
                }}
              >
                Get Position
              </button>
          </Card.Body>
        </Card>
      </div>
    )
}

export default GeolocaWidget