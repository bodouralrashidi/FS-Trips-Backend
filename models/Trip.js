const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema({
  title: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  description: String,
  image: String,
  location: String,
  favourite: { type: Boolean, default: false },
});

module.exports = mongoose.model("Trip", TripSchema);
