const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const tripSchema = new mongoose.Schema({
  trip: [
    {
      type: String,
      autopopulate: { maxDepth: 1 },
    },
  ],
  travelHistory: [
    {
      type: String,
      autopopulate: { maxDepth: 1 },
    },
  ],
  suggestedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      autopopulate: { maxDepth: 1 },
    },
  ],

  interestInTrip: [
    {
      type: mongoose.Schema.Types.ObjectId,
      autopopulate: { maxDepth: 1 },
    },
  ],
  interestedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      autopopulate: { maxDepth: 1 },
    },
  ],
  acceptedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      autopopulate: { maxDepth: 1 },
    },
  ],
  rejectedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      autopopulate: { maxDepth: 1 },
    },
  ],
});

class Trips {
  async addTrip(destination, date) {
    this.trip.push({ trip: destination, date });
    trip.suggestedBy = this;
    await this.save();
    await destination.save();
  }

  async requestToJoin(tripRequest) {
    this.interestInTrip.push(tripRequest);
    trip.interestedBy.push(this);
    await this.save();
    await tripRequest.save();
  }

  async addpPastTrips(pastTrip) {
    this.travelHistory.push(pastTrip);
    await this.save();
    await pastTrip.save();
  }

  async acceptTripRequest(tripRequest) {
    tripRequest.acceptedBy = this;
    await this.save();
    await tripRequest.save();
  }

  async rejectTripRequest(tripRequest) {
    tripRequest.rejectedBy = this;
    await this.save();
    await tripRequest.save();
  }
}
tripSchema.loadClass(Trips);
tripSchema.plugin(autopopulate);

module.exports = mongoose.model("Trips", tripSchema);
