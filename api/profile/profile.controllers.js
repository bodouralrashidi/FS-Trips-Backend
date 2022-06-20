const Profile  = require("../../models/profile")

exports.getProfileId = async (req, res, next) => {
  const { profileId } = req.params;
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
      const {userId} = req.params
      try {
          const newProfile = await  Profile.findByIdAndUpdate(userId, req.body);
          console.log(newProfile)
          res.status(201).json(newProfile);
      } catch (error) {
          next(error);
      }
    };