const express = require("express");
const app = express();
const passport = require("passport");
const cors = require("cors");
const { localStrategy, jwtStrategy } = require("./middleware/passport");
const connectDB = require("./database");
const userRoutes = require("./api/users/users.routes");
const tripRoutes = require("./api/trip/trip.routes");

connectDB();

//middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//user Routes
app.use(userRoutes);
//trip Routes
app.use("/api/trip", tripRoutes);

//error handling middleware
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

//Path not found
app.use((req, res, next) => {
  res.status(404).json({ message: "path not found" });
  // res.redirect("/api/events/all")
});

//Backend on Localhost:8000
app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
