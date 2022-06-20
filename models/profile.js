const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const ProfileSchema = new mongoose.Schema({
  image: String,
  bio : String,
  userId: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  slug: { type: String, slug: "name" }
});

module.exports = mongoose.model("Profile", ProfileSchema);
