const Coin = require('./coin.model');
const ReadPreference = require('mongodb').ReadPreference;
const TruffleContract = require("truffle-contract");
var PayItForward = require("../build/contracts/PayItForward.json");
const Web3 = require('./web3');
// const ethService = require('./eth.service');

require('./mongo').connect();
const web3 = Web3.connect();
var PIF = TruffleContract(PayItForward);
PIF.setProvider(web3.currentProvider);
PIF.defaults({
  from: web3.eth.coinbase,
  gas: "900000",
  gasPrice: web3.eth.gasPrice
});

function postTran(req, res) {
  const coin = new Coin();
  coin.datetime = req.body.datetime;
  coin.fusername = req.body.from.username;
  coin.faddress = req.body.from.address;
  coin.femail = req.body.from.email;
  coin.fcompany = req.body.from.company;
  coin.tusername = req.body.to.username;
  coin.taddress = req.body.to.address;
  coin.temail = req.body.to.email;
  coin.tcompany = req.body.to.company;
  coin.type = req.body.type;
  coin.amount = req.body.amount;
  coin.comment = req.body.comment;
  coin.save(error => {
    console.log('Record is created successfully!');
  });
}

function getTranByTadd(req, res, taddress) {
  console.log(taddress)
  Coin.find({ "taddress": taddress }).
    limit(15).
    sort({datetime: -1}).
    exec(function(error, records) {
      if (checkServerError(res, error)) return;
      if (!checkFound(res, records)) return;
      res.status(200).json(records);
      console.log('getTran is exec successfully!');
      console.log(records);
  });
}

function getTranByFadd(req, res, faddress) {
  console.log(faddress)
  Coin.find({ "faddress": faddress }).
    limit(15).
    sort({datetime: -1}).
    exec(function(error, records) {
      if (checkServerError(res, error)) return;
      if (!checkFound(res, records)) return;
      res.status(200).json(records);
      console.log('getTran is exec successfully!');
      console.log(records);
  });
}

function checkServerError(res, error) {
    if (error) {
      res.status(500).send(error);
      return error;
    }
}
  
function checkFound(res, records) {
  if (!records) {
    res.status(404).send('Records not found.');
      return;
  }
    return records;
}

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
  });
};

function newAccount(req,res){
  var from = req.body.from.address;
  console.log("newAccount is fired!!");
  PIF.deployed().then(function(instance){
    return instance.newAccount({from: from},{privateFor: ["ROAZBWtSacxXQrOe3FGAqJDyJjFePR5ce4TSIzmJ0Bc="]});
  }).then(function(result) {
    res.status(201).json(result.tx);
    console.log("Transaction: " + result);
  }).catch(function(e){
    console.log("newAccount's error: " + e);
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
  });
};

module.exports = {
    postTran,
    getTranByFadd,
    getTranByTadd,
    sendCoin,
    newAccount,
    getRecieved,
    getSent
};