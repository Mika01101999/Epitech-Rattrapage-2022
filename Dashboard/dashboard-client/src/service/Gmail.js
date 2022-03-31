import { GoogleLogin } from 'react-google-login'
import axios from 'axios'
import { useState } from 'react'
import { Card, Row, Col } from 'react-bootstrap';
import calendarLogo from "../assets/google-calendar.png";


function GoogleCalendar() {

  const responseGoogle = response => {
    console.log(response);
    console.log("wwww");
    const { code } = response;
    axios.post('/api/create-tokens', { code })
      .then(response => {
        console.log(response.data);
        setSignedIn(true);
      })
      .catch(error => console.log(error.message));

  }

  const responseError = (error) => {
    console.log("sss");
    console.log(error);
  }

  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [startDateTime, setStartDateTime] = useState('');
  const [signedIn, setSignedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(summary, description, location, endDateTime, startDateTime);
    axios.post('/api/create-event', {
      summary,
      description,
      location,
      startDateTime,
      endDateTime,
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => console.log(error.message));

  }

  return (
    <>
      {
        !signedIn ? (
          <>
            <Card style={{ width: '39rem', height: '20rem', backgroundColor: '#ececec' }}>
              <Card.Img variant="top-left" src={calendarLogo} width="50"
                height="50" align="left" />
              <Card.Body>
                <Card.Title>Calendar widget</Card.Title>
                <br />
                <GoogleLogin
                clientId='586680212360-rtc6o4nre05vi4fl9v53iuq2cdng1ai9.apps.googleusercontent.com'
                buttonText="sign in and authorize calendar"
                onSuccess={responseGoogle}
                onFailure={responseError}
                cookiePolicy={'single_host_origin'}
                responseType='code'
                accessType='offline'
                scope='openid email profile https://www.googleapis.com/auth/calendar'
              />
              </Card.Body>
            </Card>
            <div>
            </div>
          </>
        ) : (
          <div >
            <Card style={{ width: '39rem', height: '20rem', backgroundColor: '#ececec' }}>
              <Card.Img variant="top-left" src={calendarLogo} width="50"
                height="50" align="left" />
              <Card.Body>
                <Card.Title>Calendar Widget</Card.Title>
                <br />
                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col>
                      <label htmlFor="summary">Summary</label>
                      <br />
                      <input
                        type="text"
                        id="summary"
                        value={summary}
                        onChange={e => setSummary(e.target.value)} />
                      <br />

                      <label htmlFor="description">description</label>
                      <br />
                      <textarea
                        type="text"
                        id="description"
                        value={description}
                        onChange={e => setDescription(e.target.value)} />
                      <br />

                      <label htmlFor="location">location</label>
                      <br />
                      <input
                        type="text"
                        id="location"
                        value={location}
                        onChange={e => setLocation(e.target.value)} />
                      <br />
                    </Col>
                    <Col>
                      <label htmlFor="startDateTime">Start date time</label>
                      <br />
                      <input
                        type="datetime-local"
                        id="startDateTime"
                        value={startDateTime}
                        onChange={e => setStartDateTime(e.target.value)} />
                      <br />

                      <label htmlFor="endDateTime">end date time</label>
                      <br />
                      <input
                        type="datetime-local"
                        id="endDateTime"
                        value={endDateTime}
                        onChange={e => setEndDateTime(e.target.value)} />
                      <br />
                      <button type="submit">create event</button>
                    </Col>
                  </Row>
                </form>
              </Card.Body>
            </Card>
          </div>
        )
      }

    </>
  )
}

export default GoogleCalendar;