const express = require('express');
const router = express.Router();

const userService = require('./user.service');

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
  userService.postUser(req, res);
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
  res.status(200).json({"message":"success"});
});

router.get('/getrecords/:email', (req, res) => {
  console.log("GET /api/getrecords/" + req.params.email);
  res.status(200).json([{"datetime":"19:00","from":"abc@gmail.com","to":"abc123@gmail.com","type":"ありがとう","amount":"10","comment":"もっと頑張れ"}]);
});

module.exports = router;