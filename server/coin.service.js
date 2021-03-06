const Coin = require('./coin.model');
const ReadPreference = require('mongodb').ReadPreference;

require('./mongo').connect();

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
    if (checkServerError(res, error)) return;
    console.log('Record is created successfully!');
  });
}

function getTranByTadd(req, res, taddress) {
  Coin.find({ "taddress": taddress }).
    limit(15).
    sort({datetime: -1}).
    exec(function(error, records) {
      if (checkServerError(res, error)) return;
      if (!checkFound(res, records)) return;
      res.status(200).json(records);
      console.log('getTran is exec successfully!');
  });
}

function getTranByFadd(req, res, faddress) {
  Coin.find({ "faddress": faddress }).
    limit(15).
    sort({datetime: -1}).
    exec(function(error, records) {
      if (checkServerError(res, error)) return;
      if (!checkFound(res, records)) return;
      res.status(200).json(records);
      console.log('getTran is exec successfully!');
  });
}

function getTranAll(req, res) {
  Coin.find().
    sort({datetime: -1}).
    exec(function(error, records) {
      if (checkServerError(res, error)) return;
      if (!checkFound(res, records)) return;
      res.status(200).json(records);
      console.log('getTranAll is exec successfully!');
  });
}

function getTranAll100(req, res) {
  Coin.find().
  limit(100).
  sort({datetime: -1}).
  exec(function(error, records) {
    if (checkServerError(res, error)) return;
    if (!checkFound(res, records)) return;
    res.status(200).json(records);
    console.log('getTranAll100 is exec successfully!');
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

module.exports = {
    postTran,
    getTranByFadd,
    getTranByTadd,
    getTranAll,
    getTranAll100
};