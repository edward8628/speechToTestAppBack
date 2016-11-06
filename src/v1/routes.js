
const debug = require('debug')(`${process.env.APPNAME}:routes`);
const routeGenerator = require('../utils/routeGenerator');
const version = '/v1';
const handlers = require('../utils/handlerGenerator.js')(version);

const routes = [
  {
    action: 'get',
    endpoint: '/health',
    handler: handlers.health
  },
  {
    action: 'get',
    endpoint: '/users/:useremail',
    handler: handlers.getUserById
  },
  {
    action: 'post',
    endpoint: '/users/createuser',
    handler: handlers.createUser
  }
];

const generator = (app) => {
  debug(`Generating $(version) routes`);
  routes.forEach((route) => {
    routeGenerator(app, route, version)
  })
}

module.exports = generator;
