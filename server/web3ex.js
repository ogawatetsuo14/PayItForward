var web3_extended = require('web3_extended');

var options = {
  host: 'http://52.187.190.184:22000',
  personal: true,
  admin: true,
  debug: false
};

var web3Ex = web3_extended.create(options);

module.exports = {
  web3Ex
};