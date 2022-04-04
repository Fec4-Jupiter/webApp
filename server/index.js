require('dotenv').config();
const express = require('express');
const axios = require('axios');
const session = require('express-session');

const app = express();
app.use(express.static(`${__dirname}/../client/dist`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'asdfasfasdfasdfasdfasdf',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false },
}));

const apiUrl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc';

app.all('/*', (req, res) => {
  const targetUrl = apiUrl + req.url;
  console.log('Req recieved: ', req.url);
  axios({
    method: req.method,
    url: targetUrl,
    data: req.body,
    headers: {
      Authorization: process.env.API_TOKEN,
    },
  })
    .then((response) => {
      res.status(response.status).send(response.data);
    })
    .catch((err) => {
      res.status(err.response.status).send(err.response.data);
    });
});

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
