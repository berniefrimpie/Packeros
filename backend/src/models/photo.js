const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const photoSchema = new mongoose.Schema({
  photoName: String,
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  commentedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      comment: String,
    },
  ],
  caption: String,
});

photoSchema.plugin(autopopulate);
module.exports = mongoose.model("Photo", photoSchema);
