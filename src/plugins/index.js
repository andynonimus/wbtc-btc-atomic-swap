const logger = require('../logger');
const axios = require('./axios');
const bitgo = require('./bitgo');
const web3 = require('./web3');

module.exports = app => {
  app.context.axios = axios;
  app.context.bitgo = bitgo;
  app.context.web3 = web3;

  logger.info('Initialized plugins');
};
