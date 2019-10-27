const fs = require('fs');
const logger = require('../logger');

const BIP199 = require('./BIP199.js');
const ERC1630 = fs.readFileSync('src/contracts/ERC1630.sol', 'utf8');
const config = JSON.parse(fs.readFileSync('src/config/default.json', 'utf8'));

module.exports = app => {
  const web3 = app.context.web3;

  const KyberNetworkProxyAddress = config.contracts.KyberNetworkProxy;
  const KyberNetworkProxyABI = JSON.parse(fs.readFileSync('src/contracts/abi/KyberNetworkProxy.abi', 'utf8'));
  const KyberNetworkProxy = new web3.eth.Contract(KyberNetworkProxyABI, KyberNetworkProxyAddress);

  const WBTCAddress = config.contracts.WBTCToken;
  const WBTCABI = JSON.parse(
    fs.readFileSync('src/contracts/abi/WBTC.abi', 'utf8')
  );
  const WBTC = new web3.eth.Contract(WBTCABI, WBTCAddress);

  app.context.contracts = {
    KyberNetworkProxy,
    WBTC,
    BIP199,
    ERC1630,
  };

  logger.info('Initialized contracts');
};
