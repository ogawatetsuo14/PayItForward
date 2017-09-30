var lightwallet = require('./eth-lightwallet')
var txutils = lightwallet.txutils
var signing = lightwallet.signing
var encryption = lightwallet.encryption

var newWallet = function(password){
    return new Promise(function(resolve,reject){
      var address;

      lightwallet.keystore.createVault({
        password: password,
      }, function (err, ks) {
        ks.keyFromPassword(password, function (err, pwDerivedKey) {
          if (err) throw err;
          ks.generateNewAddress(pwDerivedKey, 1);
          address = ks.getAddresses()[0];
          console.log("address: " + address);
          if (address != null) {
            resolve(address,ks);
          } else {
            reject('address is null');
          }
        });
      });
    })
}

module.exports = {
    newWallet
};