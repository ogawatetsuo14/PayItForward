var PayItForward = artifacts.require("PayItForward");

module.exports = function(done) {
    console.log("Getting deployed version of PayItForward...")
    PayItForward.deployed().then(function(instance) {
      console.log("Setting value to 65...");
      return instance.sendCoin("0xcfb3ca2065f4397f98f7d186619fabc5d485e319",10,{from: "0x4a2c928345b6e19ae5622e041c94c6dddbf5a396"});
    }).then(function(result) {
      console.log("Transaction:", result.tx);
      console.log("Finished!");
      done();
    }).catch(function(e) {
      console.log(e);
      done();
    });
  };