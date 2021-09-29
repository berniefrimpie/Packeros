/* eslint-disable no-param-reassign */
const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");
// const Trip = require("./trip");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  bio: String,
  photos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Photo",
      autopopulate: { maxDepth: 1 },
    },
  ],
  comments: [String],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Photo",
    },
  ],
  suggestedTrips: [
    {
      type: String,
      ref: "Trip",
      autopopulate: true,
    },
  ],
  travelHistory: [
    {
      type: String,
    },
  ],
});

class User {
  async addPhoto(photo) {
    this.photos.push(photo);
    await this.save();
  }

  async suggestTrip(trip) {
    this.suggestedTrips.push(trip);
    trip.suggestedBy.push(this);
    await this.save();
    await trip.save();
  }

  async requestToJoin(trip) {
    trip.interestInTrip.push(this);
    trip.interestedBy.push(this);
    await trip.save();
  }

  async addPastTrips(trip) {
    this.travelHistory.push(trip);
    await this.save();
  }

  async acceptTripRequest(trip) {
    trip.acceptedBy = this;
    await trip.save();
  }

  async rejectTripRequest(trip) {
    trip.rejectedBy = this;
    await trip.save();
  }

  async addComments(photo, comment) {
    photo.commentedBy.push(this);
    photo.comments.push({ user: this, comment });
    this.comments.push(comment);
    await this.save();
  }

  async likePhoto(photo) {
    this.likes.push(photo);
    photo.likedBy.push(this);

    await photo.save();
    await this.save();
  }

  async addCaption(photo, caption) {
    photo.caption = caption;
    await photo.save();
  }
}
userSchema.loadClass(User);
userSchema.plugin(autopopulate);

module.exports = mongoose.model("User", userSchema);
