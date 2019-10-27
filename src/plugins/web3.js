const fs = require('fs');
const Web3 = require('web3');

const config = JSON.parse(fs.readFileSync('src/config/default.json', 'utf8'));

const web3 = new Web3(new Web3.providers.HttpProvider(`${config.rpc.eth.rpcURL}/${process.env.ETH_RPC_KEY}`));

module.exports = web3;
