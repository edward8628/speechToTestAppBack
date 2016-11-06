
const debug = require('debug')(`${process.env.APPNAME}:handlerGenerator`);
const path = require('path');
const fs = require('fs');

const handlerGenerator = (apiPath) => {
  const handlers = {};

  const handlerCreator = (directory) => {
    const directoryPath = path.join(__dirname, '../' + apiPath + '/' + directory);
    fs.readdirSync(directoryPath)
    .filter((file) => file !== '.DS_Store')
    .forEach((file) => {
      debug('Requiring ' + file + ' as a handler');
      handlers[file.replace('.js','')] = require('../' + apiPath + '/' + directory + '/' + file);
    });
  };

  fs.readdirSync(path.join(__dirname, '../' + apiPath))
  .filter((folder) => fs.lstatSync(path.join(__dirname, '../' + apiPath + '/' + folder)).isDirectory())
  .forEach((folder) => {
    if(folder.indexOf('.js') < 0) handlerCreator(folder);
  });
  return handlers;
};

module.exports = handlerGenerator;
