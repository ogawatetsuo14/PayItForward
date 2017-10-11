var Web3 = require('web3');
const env = require('./env/environment');

const quorumUri = `http://${env.quorumAddress}.:${env.quorumPort}`;

function connect() {
  return new Web3(new Web3.providers.HttpProvider(quorumUri));
};

module.exports = {
  connect
};