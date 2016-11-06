'use strict'
require(`dotenv`).config();

const app = require('express')();
const debug = require('debug')(`${process.env.APPNAME}:index`);
const bodyParser = require('body-parser');
const v1routes = require('./v1/routes');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

//setup route
v1routes(app);

if(process.env.DEBUG != 'randombackend*') console.log(`'export DEBUG=randombackend*' for debugging`);
app.listen(port, host, () => {
  debug(`randombackend is running on ${host}:${port}`);
});

