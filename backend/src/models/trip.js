const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const tripSchema = new mongoose.Schema({
  destination: {
    type: [String],
    // required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  suggestedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  interestInTrip: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  interestedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  acceptedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  rejectedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

class Trip {}
tripSchema.loadClass(Trip);
tripSchema.plugin(autopopulate);

module.exports = mongoose.model("Trip", tripSchema);
