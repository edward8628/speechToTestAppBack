'use strict'

const debug = require('debug')(`${process.env.APPNAME}:routeGenerator`);

const routeGenerator = (app, route) => {
  let args = [route.endpoint];
  //TODO: need an authentication 
  args.push(route.handler)
  app[route.action](...args);
  debug('Generated type: ' + route.action.toUpperCase() + ' endpoint -> ' + route.endpoint);
}

module.exports = routeGenerator