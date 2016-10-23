
const debug = require('debug')('randombackend-health');

const health = (req, res) => {
  debug("healthcheck request");
  res.status(200).send({success: "ok"});
}

module.exports = health;