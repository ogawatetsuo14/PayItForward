var PayItForward = artifacts.require("PayItForward");

module.exports = function(done) {
    console.log("Getting deployed version of PayItForward...")
    PayItForward.deployed().then(function(instance) {
      return instance.getSent({from:"0x4a2c928345b6e19ae5622e041c94c6dddbf5a396"});
    }).then(function(result) {
      console.log("getSent's tran: ", result);
      console.log("Finished!");
      done();
    }).catch(function(e) {
      console.log(e);
      done();
    });
  };