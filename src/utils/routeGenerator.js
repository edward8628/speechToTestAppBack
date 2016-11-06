'use strict'

const debug = require('debug')(`${process.env.APPNAME}:routeGenerator`);

const routeGenerator = (app, route, version) => {
  let args = [version + route.endpoint];
  //TODO: need an authentication 
  args.push(route.handler)
  app[route.action](...args);
  debug('Generated type: ' + route.action.toUpperCase() + ' endpoint -> ' + args[0]);
}

module.exports = routeGenerator