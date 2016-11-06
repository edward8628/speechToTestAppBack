'use strict'
require(`dotenv`).config();

const app = require('express')();
const debug = require('debug')(`${process.env.APPNAME}:index`);

const bodyParser = require('body-parser');
app.use(bodyParser.json());

//setup routes
const v1routes = require('./v1/routes');
v1routes(app);

//setup mongodb
const mongoose = require('mongoose');
if (process.env.NODE_ENV=='production') {
  mongoose.connect(process.env.MONGO_URL);
} else {
  mongoose.connect('mongodb://localhost:myProject/myProject');
}

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 5000;

if(process.env.DEBUG != 'randombackend*') console.log(`'export DEBUG=randombackend*' for debugging`);
app.listen(port, host, () => {
  debug(`randombackend is running on ${host}:${port}`);
});

