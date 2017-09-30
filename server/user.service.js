const User = require('./user.model');
const ReadPreference = require('mongodb').ReadPreference;
// const ethService = require('./eth.service');

require('./mongo').connect();

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

function postUser(req, res) {
  const originalUser = { 
    email: req.body.email, 
    password: req.body.password, 
    username: req.body.username ,
    company: req.body.company , 
    address: "123456"
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
    address: "123456789"
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
  authenticate
};
