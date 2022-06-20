const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema({
  title: { type: String, required: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  description: String,
  image: String,
  location: String,
  //   list: [{
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "List",
  //   }],
  //   QA: [{
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "QA",
  //   }]
});

module.exports = mongoose.model("Trip", TripSchema);
