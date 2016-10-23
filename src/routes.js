
const debug = require('debug')('randombackend-routes');
const routeGenerator = require('./utils/routeGenerator');
const health = require('./v1/health'); //can be a handler generator

const routes = [
  {
    action: 'get',
    endpoint: '/health',
    handler: health
  }
];

const generator = (app) => {
  routes.forEach((route) => {
    routeGenerator(app, route)
  })
}

module.exports = generator;
