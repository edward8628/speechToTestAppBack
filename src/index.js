
const express = require('express');
const debug = require('debug')('randombackend-index');
const bodyParser = require('body-parser');

const app = express();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.get("/health", (req, res) => {
  debug("healthcheck request");
  res.status(200).send({success: "ok"});
});

//setup route


if(process.env.DEBUG != 'randombackend*') console.log(`'export DEBUG=randombackend*' for debugging`);
app.listen(port, host, () => {
  debug(`randombackend is running on ${host}:${port}`);
});
