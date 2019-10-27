const bitcoinjs = require('bitcoinjs-lib');

module.exports = (chain, address, web3) => {
  if (chain === 'btc') {
    try {
      bitcoinjs.address.toOutputScript(address, bitcoinjs.networks.testnet);
      return true;
    } catch (e) {
      return false;
    }
  } else if (chain === 'eth') {
    return web3.utils.isAddress(address);
  }
};
