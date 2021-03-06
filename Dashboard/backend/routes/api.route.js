const router = require('express').Router();
const { google } = require('googleapis');

const GOOGLE_CLIENT_ID = '586680212360-rtc6o4nre05vi4fl9v53iuq2cdng1ai9.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = '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'
const REFRESH_TOKEN = "1//03K57g5DMJN7SCgYIARAAGAMSNwF-L9IrWyIPj7Sp1Ojpgep7TDayVxp7Vn8OeZHHiecNPJ5hUY4rrkAk7-bRvTXf-ZC9JO941UM"

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
