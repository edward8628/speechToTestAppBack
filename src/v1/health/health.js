
const debug = require('debug')(`${process.env.APPNAME}:health`);

const health = (req, res) => {
  debug("healthcheck request");
  res.status(200).send({success: "ok"});
}

module.exports = health;