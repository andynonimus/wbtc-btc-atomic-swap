const bitcoinjs = require('bitcoinjs-lib');

getPubKeyHash (address) {
  const outputScript = bitcoin.address.toOutputScript(address, this._network)
  const type = classify.output(outputScript)
  if (![classify.types.P2PKH, classify.types.P2WPKH].includes(type)) {
    throw new Error(`Bitcoin swap doesn't support the address ${address} type of ${type}. Not possible to derive public key hash.`)
  }

  try {
    const bech32 = bitcoin.address.fromBech32(address)
    return bech32.data
  } catch (e) {
    const base58 = bitcoin.address.fromBase58Check(address)
    return base58.hash
  }
}

module.exports = (recipientAddress, refundAddress, secretHash, nLockTime, ctx) => {  
  const { contracts } = ctx;
  const { BIP199 } = contracts;

  const recipientPubKeyHash = getPubKeyHash(recipientAddress)
  const refundPubKeyHash = getPubKeyHash(refundAddress)

  BIP199[2] = bitcoinjs.script.number.encode(32);
  BIP199[5] = Buffer.from(secretHash, 'hex');
  BIP199[9] = recipientPubKeyHash;
  BIP199[11] = bitcoinjs.script.number.encode(nLockTime);
  BIP199[16] = refundPubKeyHash;

  return bitcoinjs.script.compile(BIP199);
};
