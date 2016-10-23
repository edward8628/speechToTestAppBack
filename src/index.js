'use strict'

const express = require('express');
const debug = require('debug')('randombackend-index');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

//setup route
routes(app);

if(process.env.DEBUG != 'randombackend*') console.log(`'export DEBUG=randombackend*' for debugging`);
app.listen(port, host, () => {
  debug(`randombackend is running on ${host}:${port}`);
});

