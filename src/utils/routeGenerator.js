'use strict'

const debug = require('debug')('randombackend-routeGenerator');

const routeGenerator = (app, route) => {
  debug(route);
  app[route.action](route.endpoint, route.handler)
}

module.exports = routeGenerator