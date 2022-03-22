import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import logo1 from "../assets/nuage.svg";
import React, { useState } from "react"
import axios from "axios";

const DisplayWeather = () => {
    const [temperature, setTemperature] = useState("");
    const [desc, setDesc] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    var date = new Date().toLocaleString();

    const getWeatherData = (city, country) => {
      axios({
        method: "GET",
        url: `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=bf63324dffc9c04fd1dd5f575ac75753`,
      })
        .then((response) => {
          console.log(response.data.main.temp);
          setTemperature(response.data.main.temp - 273.15);
          setDesc(response.data.weather[0].main);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const setDate = () => {
      date = new Date().toLocaleString();
    };
    
    const tasks = React.useMemo(
      () => [
        {
          fn: getWeatherData,
          config: '* * * * *'
        },
        {
          fn: setDate,
          config: '* * * * *'
        },
      ],
      []
    )

      return (
        <div >
          <Card style={{ width: '39rem', height: '20rem' , backgroundColor: '#ececec'}}>
            <Card.Img variant="top-left" src={logo1} width="50"
              height="50" align="left"/>
            <Card.Body>
              <Card.Title>Weather Service</Card.Title>
              <Card.Text>
                City: {city}
              </Card.Text>
              <Card.Text>
                Date: {date}
              </Card.Text>
              <Card.Text>
                Temperature: {Math.round(temperature * 100) / 100} ℃
              </Card.Text>
              <Card.Text>
                Weather: {desc}
              </Card.Text>
              <br />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter City"
              />
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Enter Country"
              />
              <button
                onClick={() => {
                  setDate();
                  getWeatherData(city, country);
                }}
              >
                Get Infos
              </button>
            </Card.Body>
          </Card>
        </div>
      )
}

export default DisplayWeather