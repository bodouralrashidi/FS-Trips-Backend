const User = require("../../models/User");
const Profile = require("../../models/profile");
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
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.signup = async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 5);
    req.body.password = hashPassword;
    const newUser = await User.create(req.body);
    const newProfile = await Profile.create({ userId : newUser._id});
    await User.findByIdAndUpdate(newUser, {
        $push: { profile: newProfile._id }, 
    });
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
    const users = await User.find().populate('profile')
    res.status(201).json(users);
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.updateUser= async (req, res, next) => {
  try {
  const { userId } = req.params;
   const founduser =  await User.findById(userId);
   console.log(founduser)
   founduser.set({Fname:req.body.Fname, Lname:req.body.Lname});
await founduser.save();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
exports.getUserId = async (req, res, next) => {
  console.log("get user id")
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).populate("trips");
    console.log(user, "the user is found")
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};