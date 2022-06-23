const express = require("express");

const router = express.Router();

const {
  getProfileId,
  getProfiles,
  updateProfile,
  createProfile,
  getProfileByUserId,
} = require("./profile.controllers");

router.param("profileId", async (req, res, next, profileId) => {
  const profile = await getProfileId(profileId, next);
  if (profile) {
    req.profile = profile;
    next();
  } else {
    const err = new Error("Profile Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/profiles", getProfiles);
router.get("/:profileId", getProfileId);
router.get("/user-profile/:userId", getProfileByUserId);
router.put("/:userId", updateProfile);
router.post("/profiles", createProfile);

module.exports = router;
