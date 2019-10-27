const bitcoinjs = require('bitcoinjs-lib');
const { OPS } = bitcoinjs.script;

exports.module = [
  OPS.OP_IF,
  OPS.OP_SIZE,
  '<script number>',
  OPS.OP_EQUALVERIFY,
  OPS.OP_SHA256,
  '<digest>',
  OPS.OP_EQUALVERIFY,
  OPS.OP_DUP,
  OPS.OP_HASH160,
  '<seller pubkey hash>',
  OPS.OP_ELSE,
  '<num>',
  OPS.OP_CHECKLOCKTIMEVERIFY,
  OPS.OP_DROP,
  OPS.OP_DUP,
  OPS.OP_HASH160,
  '<buyer pubkey hash>',
  OPS.OP_ENDIF,
  OPS.OP_EQUALVERIFY,
  OPS.OP_CHECKSIG
];