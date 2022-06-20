const Profile  = require("../../models/profile")

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
        const { profileId } = req.params;
      await Profile.findByIdAndUpdate(profileId, req.body);
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