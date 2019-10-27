const session = require('telegraf/session');
const logger = require('../logger');
const commandArgs = require('./commandArgs');
const rateLimit = require('./rateLimit');

module.exports = app => {
  app.use(commandArgs());
  app.use(rateLimit());
  app.use(session());

  logger.info('Initialized middleware');
};
