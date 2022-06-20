const express = require("express");
const passport = require("passport");
const router = express.Router();

const { signup, signin, getUsers,getUserInfo } = require("./users.controllers");

router.post("/signup", signup);
router.post("/signin",
  passport.authenticate("local", { session: false }),
  signin
);
router.get("/users", getUsers);
router.get("/:userId/", getUserInfo);

module.exports = router;
