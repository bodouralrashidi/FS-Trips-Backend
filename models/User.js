const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  Fname: {
    type: String,
    required: true
  },
  Lname: {
    type: String,
    required: true
  },
  profile:{type: mongoose.Schema.Types.ObjectId, ref:"Profile"},
});

module.exports = mongoose.model('User', UserSchema);
