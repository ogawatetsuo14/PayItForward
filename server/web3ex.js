var web3_extended = require('web3_extended');


function connect() {
  var options = {
    host: 'http://52.230.18.254:22000',
    personal: true,
    admin: true,
    debug: false
  };
  return web3_extended.create(options);
};

module.exports = {
  connect
};