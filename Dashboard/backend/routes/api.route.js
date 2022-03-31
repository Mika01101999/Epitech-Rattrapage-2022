const router = require('express').Router();
const { google } = require('googleapis');
var ip = require("ip");

const GOOGLE_CLIENT_ID = '586680212360-rtc6o4nre05vi4fl9v53iuq2cdng1ai9.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = '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'
const REFRESH_TOKEN = '1//09smL9xadwR22CgYIARAAGAkSNwF-L9Ir4mp5lsZAAePeXmZHUqGheZTzd1Q6vB_QqHK718mObZRsypakPq35tp55YfL8MfHnHTE'

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  'http://localhost:3000'
)

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

router.post('/create-tokens', async (req, res, next) => {
  try {
    const { code } = req.body;
    const { tokens } = await oauth2Client.getToken(code);
    res.send(tokens);
  } catch (error) {
    next(error);
  }
})

router.get('/about.json', function (req, res) {
  var time = (new Date).getTime()
  res.json({
    "client": {
      "host": ip.address(),
    },
    "server": {
      "current_time": time,
      "services": [{
        "name": "weather",
        "widgets": [{
          "name": "DisplayWeather",
          "description": "Display temperature for a city.",
          "params": [{
            "name": "cityWeather",
            "type": "string"
          }]
        }]
      }, {
        "name": "Covid",
        "widgets": [{
          "name": "CovidCountryWidget",
          "description": "Display number of covid infection for a country.",
          "params": [{
            "name": "InfectionCountry",
            "type": "integer"
          }]
        }, {
          "name": "CovidCountryChartWidget",
          "description": "Display charts for covid infection for a country",
          "params": [{
            "name": "chart",
            "type": "integer"
          }]
        }, {
          "name": "CovidGlobalWidget",
          "description": "Display number of covid infection worldwide",
          "params": [{
            "name": "InfectionCountry",
            "type": "integer"
          }]
        }]
      }, {
        "name": "Currency",
        "widgets": [{
          "name": "CurrencyWidget",
          "description": "Get currency exchange for all currencies",
          "params": [{
            "name": "CurrencyExchange",
            "type": "integer"
          }]
        }]
      }, {
        "name": "Currency",
        "widgets": [{
          "name": "CurrencyWidget",
          "description": "Get currency exchange for all currencies",
          "params": [{
            "name": "CurrencyExchange",
            "type": "integer"
          }]
        }]
      },
      {
        "name": "GoogleCalendar",
        "widgets": [{
          "name": "calendarWidget",
          "description": "create event in google calendar",
          "params": [{
            "name": "Calendar",
            "type": "string"
          }]
        }]
      }]
    }
  })
})


router.post('/create-event', async (req, res, next) => {
  try {
    const { summary, description, location, endDateTime, startDateTime } = req.body;
    oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
    const calendar = google.calendar('v3');
    const response = await calendar.events.insert({
      auth: oauth2Client,
      calendarId: 'primary',
      requestBody: {
        summary: summary,
        description: description,
        location: location,
        colorId: '6',
        start: {
          dateTime: new Date(startDateTime),
        },
        end: {
          dateTime: new Date(endDateTime),
        },
      },
    })
    res.send(response);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
