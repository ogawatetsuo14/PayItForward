var Web3 = require('web3');

const env = require('./env/environment');

// eslint-disable-next-line max-len
const quorumUri = `http://${env.qaddress}:${env.qport}`;

function connect() {
    var web3 = new Web3(new Web3.providers.HttpProvider(quorumUri));
}

module.exports = {
  connect,
  mongoose
};