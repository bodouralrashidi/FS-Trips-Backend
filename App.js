const express = require("express");
const connectDB = require("./database");
const cors = require("cors");

const app = express();
const profileRoutes = require("./api/profile/profile.routes");

connectDB();

app.use(cors());
app.use(express.json());
app.use(profileRoutes);
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
