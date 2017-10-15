const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String, required: true, index: {unique: true }},
    password: { type: String, required: true },
    username: { type: String, required: true , unique: true },
    company: { type: String, required: true },
    address: { type: String, required: true }
  },
  {
    collection: 'users',
    read: 'nearest'
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;