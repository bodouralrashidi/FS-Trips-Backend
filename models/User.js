const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  profile:{type: mongoose.Schema.Types.ObjectId, ref:"Profile"},
  trips:[{type: mongoose.Schema.Types.ObjectId, ref:"Trip"},],

});

module.exports = mongoose.model('User', UserSchema);
