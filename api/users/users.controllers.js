const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

exports.signin = async (req, res) => {
  try {
    const payload = {
      _id: req.user._id,
      username: req.user.username,
      expires: Date.now() + keys.JWT_EXPIRATION_MS,
    };
    const token = jwt.sign(payload, keys.JWT_SECRET);
    res.status(200).json(token);
    console.log(token)
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.signup = async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 5);
    req.body.password = hashPassword;
    const newUser = await User.create(req.body);
    const payload = {
      _id: newUser._id,
      username: newUser.username,
      expires: Date.now() + keys.JWT_EXPIRATION_MS,
    };
    const token = jwt.sign(payload, keys.JWT_SECRET);
    res.status(201).json(token);
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.getUserInfo = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const foundUser = await User.findById(userId);
    return foundUser;
  } catch (error) {
    next(error);
  }
};


