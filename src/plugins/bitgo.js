require('dotenv').config();
const BitGo = require('bitgo');
const bitgo = new BitGo.BitGo({ env: 'prod', accessToken: process.env.BITGO_TOKEN });

module.exports = bitgo;
