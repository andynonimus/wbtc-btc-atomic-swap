const bitcoinjs = require('bitcoinjs-lib');
const classify = require('bitcoinjs-lib/src/classify');

module.exports = (address) => {  
  const outputScript = bitcoinjs.address.toOutputScript(address, bitcoinjs.networks.testnet);
  const type = classify.output(outputScript);
  
  if (![classify.types.P2PKH, classify.types.P2WPKH].includes(type)) {
    throw new Error(`Address ${address} of type ${type} not supported.`);
  }

  try {
    const bech32 = bitcoinjs.address.fromBech32(address);
    return bech32.data.toString('hex');
  } catch (e) {
    const base58 = bitcoinjs.address.fromBase58Check(address);
    return base58.hash.toString('hex');
  }
};
