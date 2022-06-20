const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  // profile:[{type: mongoose.Schema.Types.ObjectId, ref:"profile"}],
});

module.exports = mongoose.model('User', UserSchema);
