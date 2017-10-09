const express = require('express');
const router = express.Router();

const userService = require('./user.service');
const coinService = require('./coin.service');

router.get('/users', (req, res) => {
  console.log("GET /api/users");
  userService.getUsers(req, res);
});

router.get('/users/:email', (req, res) => {
  console.log("GET /api/users" + req.params.email);
  userService.getUser(req, res);
});

router.post('/users', (req, res) => {
  console.log("POST /api/users");
  userService.getAddress(req,res)
  .then((value)=>{
    console.log(value);
    req.body.address = value;
    userService.postUser(req,res);
    userService.getEther(value);
  })
  .catch((e) => {
    console.log(e);
  });
});

router.put('/users/:email', (req, res) => {
  console.log("PUT /api/users" + req.params.email);
  userService.putUser(req, res);
});

router.delete('/users/:email', (req, res) => {
  console.log("DELETE /api/users");
  userService.deleteUser(req, res);
});

router.post('/authenticate', (req, res) => {
  console.log("POST /api/authenticate");
  userService.authenticate(req, res);
});

router.post('/send', (req, res) => {
  console.log("POST /api/send");
  console.log(req.body);
  userService.unlockAccount(req,res)
  .then((value) =>{
    //if (value) return "Failed to unlock account";
    coinService.postTran(req,res);
    coinService.sendCoin(req,res);
  })
  .catch((e) => {
    console.log(e);
  })
});

router.get('/getrcvrecords/:taddress', (req, res) => {
  console.log("GET /api/getrcvrecords/" + req.params.taddress);
  coinService.getTranByTadd(req,res,req.params.taddress);
});

router.get('/getsntrecords/:faddress', (req, res) => {
  console.log("GET /api/getsntrecords/" + req.params.faddress);
  coinService.getTranByFadd(req,res,req.params.faddress);
});

router.get('/getrecieved/:address', (req, res) => {
  console.log("GET /api/getrecieved/" + req.params.address);
  coinService.getRecieved(req,res,req.params.address);
});

router.get('/getsent/:address', (req, res) => {
  console.log("GET /api/getsent/" + req.params.address);
  coinService.getSent(req,res,req.params.address);
});

module.exports = router;