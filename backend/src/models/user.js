const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
    unique: true,
  },
  bio: String,
  photos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Photo",
      autopopulate: true,
    },
  ],
  comments: [String],
  travelHistory: [String],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Photo",
    },
  ],
});

class User {
  async addPhoto(photo) {
    this.photos.push(photo);
    await this.save();
  }

  async addComments(photo, comment) {
    photo.commentedBy.push(this);
    photo.comments.push({ user: this, comment });
    this.comments.push(comment);
    await this.save();
  }

  async addTravelHistory(pastTrip) {
    this.travelHistory.push(pastTrip);
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
