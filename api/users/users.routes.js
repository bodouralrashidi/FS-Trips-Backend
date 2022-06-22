const express = require("express");
const passport = require("passport");
const router = express.Router();

const { signup, signin, getUsers, updateUser } = require("./users.controllers");

router.post("/signup", signup);
router.post("/signin",
  passport.authenticate("local", { session: false }),
  signin
);
router.get("/users", getUsers);
router.put("/user/:userId", updateUser);

module.exports = router;
