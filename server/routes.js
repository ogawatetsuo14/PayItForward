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
  //userService.postUser(req, res);
  userService.getAddress(req,res)
  .then((value)=>{
    console.log(value);
    req.body.address = value;
    userService.postUser(req,res);  
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
  coinService.postTran(req,res);
});

router.get('/getrecords/:to', (req, res) => {
  console.log("GET /api/getrecords/" + req.params.to);
  coinService.getTran(req,res,req.params.to);
});

module.exports = router;