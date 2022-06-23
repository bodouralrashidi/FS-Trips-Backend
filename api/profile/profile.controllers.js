const Profile = require("../../models/profile");
const User = require("../../models/User");
exports.getProfileId = async (profileId, next) => {
  try {
    const profile = await Profile.findById(profileId);
    return profile;
  } catch (error) {
    next(error);
  }
};
exports.getProfileByUserId = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const profile = await Profile.findOne({ userId }).populate({
      path: "userId",
      populate: { path: "trips" },
    });

    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};
exports.getProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json(profiles);
  } catch (error) {
    next(error);
  }
};
exports.updateProfile = async (req, res, next) => {
  const { userId } = req.params;
  const { updatedProfile, updatedUser } = req.body;
  try {
    await User.findByIdAndUpdate(userId, updatedUser);
    const profile = await Profile.findOneAndUpdate({ userId }, updatedProfile, {
      returnDocument: "after",
    }).populate({
      path: "userId",
      populate: { path: "trips" },
    });
    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};
exports.createProfile = async (req, res, next) => {
  try {
    const newProfile = await Profile.create(req.body);
    res.status(201).json(newProfile);
  } catch (error) {
    next(error);
  }
};
