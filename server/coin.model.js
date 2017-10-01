const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const coinSchema = new Schema(
  {
    datetime: { type: String, required: true},
    from: { type: String, required: true },
    to: { type: String, required: true , index: {unique: true } },
    type: { type: String, required: true },
    amount: { type: Number, required: true },
    comment: { type: String}
  },
  {
    collection: 'coins',
    read: 'nearest'
  }
);

const Coin = mongoose.model('Coin', coinSchema);

module.exports = Coin;