const express = require("express");
const connectDB = require("./database");

app.use();
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});

connectDB();
