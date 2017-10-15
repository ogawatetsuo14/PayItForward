const TruffleContract = require("truffle-contract");
var PayItForward = require("../build/contracts/PayItForward.json");
const Web3 = require('./web3');

//const contract_address = '0xd94f30d9f387a55cd3278bce66e7e687186c1cf3';
const web3 = Web3.connect();
var PIF = TruffleContract(PayItForward);
PIF.setProvider(web3.currentProvider);
PIF.defaults({
  from: web3.eth.coinbase,
  gas: "900000",
  gasPrice: web3.eth.gasPrice
});

/***************************************
var event = PIF.send;
event.watch(function(error,result){
  console.log("watching send is fired!!");
  if (!error){
    console.log(result);
  }
})
***************************************/

function sendCoin(req,res){
  var to = req.body.to.address;
  var from = req.body.from.address;
  var amount = req.body.amount;
  var comment = req.body.comment;
  console.log("sendCoin is fired!!");
  PIF.deployed().then(function(instance){
    return instance.sendCoin(to,from,amount,{from: from},{privateFor: ["ROAZBWtSacxXQrOe3FGAqJDyJjFePR5ce4TSIzmJ0Bc="]});
  }).then(function(result) {
    res.status(201).json(result.tx);
    console.log("Transaction: " + result.tx);
  }).catch(function(e){
    console.log("sendCoin's error: " + e);
    res.status(500).send(e);
  });
};

function getRecieved(req,res,address){
  var from = address;
  console.log("getRecieved is fired with "+ from);
  PIF.deployed().then(function(instance){
    return instance.getRecieved(from,{from: from},{privateFor: ["ROAZBWtSacxXQrOe3FGAqJDyJjFePR5ce4TSIzmJ0Bc="]});
  }).then(function(result) {
    res.status(201).json(result);
    console.log("getRecieved: " + result);
  }).catch(function(e){
    console.log("getRecieved's error: " + e);
    res.status(500).send(e);
  });
};

function getSent(req,res,address){
  var from = address;
  console.log("getSent is fired with "+from);
  PIF.deployed().then(function(instance){
    return instance.getSent(from,{from: from},{privateFor: ["ROAZBWtSacxXQrOe3FGAqJDyJjFePR5ce4TSIzmJ0Bc="]});
  }).then(function(result) {
    res.status(201).json(result);
    console.log("getSent: " + result);
  }).catch(function(e){
    console.log("getSent's error: " + e);
    res.status(500).send(e);
  });
};

module.exports = {
    sendCoin,
    getRecieved,
    getSent
};