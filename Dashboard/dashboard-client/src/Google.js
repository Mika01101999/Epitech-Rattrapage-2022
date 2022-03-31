const express = require('express');
const app = express();
const port = 3000; // default
const { google } = require('googleapis');
const request = require('request')
const cors = require('cors');
const urlParse = require('url-parse');
const queryParse = require('query-string');
const bodyParser = require('body-parser');
const axios = require('axios');
const { datastream } = require('googleapis/build/src/apis/datastream');




app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/getURLTing", (req, res) => {
  const oauth2client = new google.auth.OAuth2(
    "801054034072-422n54ucnb9a906h5jep86l2ukrrmscq.apps.googleusercontent.com",
    "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",
    "http://localhost:3000/steps"
  )
  const scopes = ["https://www.googleapis.com/auth/fitness.activity.read profile email openid"];

  const url = oauth2client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    state: JSON.stringify({
      callbackUrl: req.body.callbackUrl,
      userId: req.body.userId
    })
  });

  request(url, (error, response, body) => {
    console.log("error: ", error);
    console.log("statusCode: ", response && response.statusCode);
    res.send({ url });
  });
});

app.get("/steps", async (req, res) => {
  const querURL = new urlParse(req.url);
  const code = queryParse.parse(querURL.query).code;// get the code from the url
  const oauth2client = new google.auth.OAuth2(
    "801054034072-422n54ucnb9a906h5jep86l2ukrrmscq.apps.googleusercontent.com",
    "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",
    "http://localhost:3000/steps"
  );
  const tokens = await oauth2client.getToken(code);
  console.log(tokens)
  res.send("HELLO 8");

  // let stepArray = [];

  // try {
  //   const result = await axios({
  //     method: "POST",
  //     headers: {
  //       authorization: "Bearer " + tokens.tokens.access_token,
  //     },
  //     "Content-Type": "application/json",
  //     url: "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
  //     data: {
  //       aggregateBy: [{
  //         dataTypeName: "com.google.step_count.delta",
  //         dataSourceId: "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
  //       }],
  //       bucketByTime: {
  //         durationMillis: 86400000,
  //         periodType: "DAYS",
  //         startTimeMillis: new Date().getTime() - 86400000 * 30,
  //         endTimeMillis: new Date().getTime()
  //       }
  //     }
  //   });
  //   stepArray = result.data.bucket
  // } catch (error) {
  //   console.log(error);
  // }
  // try {
  //   for (const dataSet of stepArray) {
  //     console.log(dataSet)
  //     for(const points of dataSet.dataSet) {
  //       console.log(points);
  //       for(const steps of points.points) {
  //         console.log(steps.value);
  //       }
  //     }
  //   }
  // }
  // catch (error) {
  //   console.log(error);
  // }
});

app.listen(port, () => console.log(`Listening on port ${port}`));

