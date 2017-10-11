var web3_extended = require('web3_extended');
const env = require('./env/environment');

const quorumUri = `http://${env.quorumAddress}.:${env.quorumPort}`;

function connect() {
  var options = {
    host: quorumUri,
    personal: true,
    admin: true,
    debug: false
  };
  return web3_extended.create(options);
};

module.exports = {
  connect
};