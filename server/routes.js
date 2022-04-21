const axios = require('axios');
const router = require('express').Router();

const joshURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc';
const kunURL = 'http://localhost:3000';
const qiURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc';

// Connect methods to their corresponding routes

// -> shop.com/products/66644/styles

router.get('/products*', (req, res) => {
  // console.log(joshURL + req.originalUrl);
  axios.get(joshURL + req.originalUrl, {
    headers: {
      Authorization: process.env.API_TOKEN,
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get('/qa*', (req, res) => {
  axios.get(kunURL + req.originalUrl, {
    headers: {
      Authorization: process.env.API_TOKEN,
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post('/qa*', (req, res) => {
  axios.post(kunURL + req.originalUrl, req.body, {
    headers: {
      Authorization: process.env.API_TOKEN,
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.put('/qa*', (req, res) => {
  axios.put(kunURL + req.originalUrl, {
    headers: {
      Authorization: process.env.API_TOKEN,
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get('/reviews*', (req, res) => {
  axios.get(qiURL + req.originalUrl, {
    headers: {
      Authorization: process.env.API_TOKEN,
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
