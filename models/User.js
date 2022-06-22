const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  Fname: String,
  Lname: String,
  profile:{type: mongoose.Schema.Types.ObjectId, ref:"Profile"},
});

module.exports = mongoose.model('User', UserSchema);
