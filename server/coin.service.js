const Coin = require('./coin.model');
const ReadPreference = require('mongodb').ReadPreference;
// const ethService = require('./eth.service');

require('./mongo').connect();

function postTran(req, res) {
  const received = { 
    datetime: req.body.datetime, 
    from: req.body.from, 
    to: req.body.to ,
    type: req.body.type , 
    amount: req.body.amount,
    comment: req.body.comment
  };
  console.log("postTrans is fired!!");
  console.log(received);
  const coin = new Coin(received);
  coin.save(error => {
    if (checkServerError(res, error)) return;
    res.status(201).json(coin);
    console.log('Record is created successfully!');
  });
}

function getTran(req, res, to) {
  console.log(to)
  Coin.find({ "to": to }).
    limit(15).
    sort({datetime: -1}).
    exec(function(error, records) {
      if (checkServerError(res, error)) return;
      if (!checkFound(res, records)) return;
      res.status(200).json(records);
      console.log('getTran is exec successfully!');
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
    getTran
};