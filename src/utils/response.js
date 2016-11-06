'use strict';

const debug = require('debug')(`${process.env.APPNAME}:commonResponse`);

const response = (startTime, res, req, statusCode, data) => {
  
  const returnObject = {
    data: data || 'Not Provided',
    statusCode: statusCode || 'Not Provided',
    requestedBy: req && req.params ? req.params.userID : 'Not Provided',
    requestedAt: startTime || 'Not Provided',
    responsedAt: new Date()
  };
  if(res) res.status(statusCode).send(returnObject);
  else {
    debug('NO RES, returning object');
    return returnObject;
  }
  
};

module.exports = response;
