var PayItForward = artifacts.require("PayItForward");

module.exports = function(deployer) {
  // Pass 42 to the contract as the first constructor parameter
  deployer.deploy(PayItForward,"", {privateFor: ["ROAZBWtSacxXQrOe3FGAqJDyJjFePR5ce4TSIzmJ0Bc="]})
};
