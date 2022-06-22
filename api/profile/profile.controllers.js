const Profile  = require("../../models/profile")
const User = require("../../models/User")
exports.getProfileId = async (profileId, next) => {
    try {
      const profile = await Profile.findById(profileId);
      return profile;
    } catch (error) {
      next(error);
    }
  };
  exports.getProfiles = async (req, res, next) => {
    try {
      const profiles = await Profile.find()
      res.status(200).json(profiles);
    } catch (error) {
      next(error);
    }
  };
  exports.updateProfile = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        const profileId = user.profile
     const foundprofile=  await Profile.findById(profileId)
        foundprofile.set({bio:req.body.bio, image:req.body.image});
        // user.set({Fname:req.body.updateUser.Fname, Lname:req.body.updateUser.Lname});
     await foundprofile.save();

      
      res.status(204).end();
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