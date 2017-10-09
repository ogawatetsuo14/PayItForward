var Web3 = require('web3');


function connect() {
  return new Web3(new Web3.providers.HttpProvider("http://52.230.18.254:22000"));
};

module.exports = {
  connect
};