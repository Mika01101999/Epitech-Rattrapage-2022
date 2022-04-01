const express = require('express');
const { appsactivity } = require('googleapis/build/src/apis/appsactivity');
const createError = require('http-errors');
const morgan = require('morgan');
require('dotenv').config();
var ip = require("ip");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});

app.get('/about.json', function (req, res) {
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

app.use('/api', require('./routes/api.route'));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
