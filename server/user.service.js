const User = require('./user.model');
const ReadPreference = require('mongodb').ReadPreference;
const web3Ex = require('./web3ex');
const Web3 = require('./web3');

require('./mongo').connect();
const web3ex = web3Ex.connect();
const web3 = Web3.connect();

function getUsers(req, res) {
  const docquery = User.find({}).read(ReadPreference.NEAREST);
  docquery
    .exec()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).send(error);
      return;
    });
}

function getUser(req, res){
  const docquery = User.findOne({email:req.params.email});
  docquery
    .exec()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).send(error);
      return;
    });
}

function getAddress(req,res){
  return new Promise(function(resolve,reject) {
    web3ex.personal.newAccount(req.body.password,function(error,result){
      if(!error) {
        console.log("getAddress is fired!!");
        resolve(result);
      } else {
        reject(error);
      }
    });
  })
}

function unlockAccount(req,res){
  var address = req.body.from.address;
  var password = "123";
  return new Promise(function(resolve,reject) {
    web3ex.personal.unlockAccount(address,password,60,function(error,result){
      if(!error) {
        console.log("unlockAccount is fired!!");
        resolve(result);
      } else {
        reject(error);
      }
    });
  })
}

function getEther(address){
  var reciever = address;
  console.log("getEther is fired with " + reciever);
  web3.eth.sendTransaction({from:web3.eth.coinbase,to:reciever,value: web3.toWei(10, "ether")},function(error,result){
    if(!error) {
      console.log(result);
      console.log("getEther is completed");
    } else {
      console.log("error: " + error);
    }
  })
}

function postUser(req, res) {
  const originalUser = {
    email: req.body.email, 
    password: req.body.password, 
    username: req.body.username ,
    company: req.body.company , 
    address: req.body.address
  };
  const user = new User(originalUser);
  user.save(error => {
    if (checkServerError(res, error)) return;
    res.status(201).json(user);
    console.log('User created successfully!');
  });
}


function putUser(req, res) {
  const originalUser = {
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    company: req.body.company,
    address: req.body.address
  };
  User.findOne({ email: req.params.email }, (error, user) => {
    if (checkServerError(res, error)) return;
    if (!checkFound(res, user)) return;

    user.password = originalUser.password;
    user.nickname = originalUser.nickname;
    user.address = originalUser.address;
    user.save(error => {
      if (checkServerError(res, error)) return;
      res.status(200).json(user);
      console.log('User updated successfully!');
    });
  });
}

function deleteUser(req, res) {
  const email = req.params.email;
  User.findOneAndRemove({ email: email })
    .then(user => {
      if (!checkFound(res, user)) return;
      res.status(200).json(user);
      console.log('User deleted successfully!');
    })
    .catch(error => {
      if (checkServerError(res, error)) return;
    });
}

function authenticate(req, res) {
  const originalAccount = { 
    email: req.body.email, 
    password: req.body.password
  };
  User.findOne({ email: originalAccount.email }, (error, user) => {
    if (checkServerError(res, error)) return;
    if (!checkFound(res, user)) return;

    if (!(user.password == originalAccount.password)) return;
    res.status(200).json(user);
    console.log('User Authenticated successfully');
  });
}

function checkServerError(res, error) {
  if (error) {
    res.status(500).send(error);
    return error;
  }
}

function checkFound(res, user) {
  if (!user) {
    res.status(404).send('User not found.');
    return;
  }
  return user;
}

module.exports = {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
  authenticate,
  getAddress,
  unlockAccount,
  getEther
};
