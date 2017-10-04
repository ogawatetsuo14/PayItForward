const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const coinSchema = new Schema(
  {
    datetime: Number,
    fusername: String,
    faddress: String,
    femail: String,
    fcompany: String,
    tusername: String,
    taddress: String,
    temail: String,
    tcompany: String,
    type: String,
    amount: Number,
    comment: String
  },
  {
    collection: 'coins',
    read: 'nearest'
  }
);
const Coin = mongoose.model('Coin', coinSchema);

module.exports = Coin;