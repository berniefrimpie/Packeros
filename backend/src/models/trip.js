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
      autopopulate: false,
    },
  ],

  interestInTrip: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      autopopulate: false,
    },
  ],
  interestedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      autopopulate: false,
    },
  ],
  acceptedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      autopopulate: false,
    },
  ],
  rejectedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      autopopulate: false,
    },
  ],
});

class Trip {}
tripSchema.loadClass(Trip);
tripSchema.plugin(autopopulate);

module.exports = mongoose.model("Trip", tripSchema);
