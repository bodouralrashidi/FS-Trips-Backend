const express = require("express");
const connectDB = require("./database");
const cors = require("cors");
const tripRoutes = require("./api/trip/trip.routes");
const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/trip", tripRoutes);


app.use((req, res, next) => {
  const err = new Error("Path Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
});

app.listen(8080, () => {
  console.log("The application is running on localhost:8080");
});
