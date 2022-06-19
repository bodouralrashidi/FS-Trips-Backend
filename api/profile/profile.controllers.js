const Profile  = require("../../models/profile")

exports.fetchProfiles = async (profileId, next) => {
    try {
      const profile = await Profile.findById(profileId);
      return recipe;
    } catch (error) {
      next(error);
    }
  };