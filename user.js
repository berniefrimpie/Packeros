const colors = require("colors");


class User {
  constructor(name, age, email) {
    this.name = name;
    this.age = age;
    this.email = email;
    this.bio = "";
    this.isOnline = false;
    this.photos = [];
    this.travelHistory = [];
    // this.pastTrip = [];
    this.likes = [];
    this.caption = [];
  }

  logIn() {
    console.log(`User ${this.email.bold.blue}, Has just logged in.`);
    return this;
  }

  logOut() {
    console.log(`User ${this.email.bold.blue}, Has just logged out.`);
    return this;
  }

  addPhoto(photo) {
    this.photos.push(photo);
  }

  commentOnPhoto(photo) {
    // let photos =
    photo.commentedBy.push(this);

    // this.comments.push(photo);
  }

  likePhoto(photo) {
    photo.likedBy.push(this);
  }

  addCaption(caption) {
    this.caption.push(caption);
  }

  addTravelHistory(pastTrip) {
    this.travelHistory.push(pastTrip); // visits
    // return this;
  }

  get profile() {
    return `
    # ${this.name.blue.bold} (${this.age})
    bio: ${this.bio}

    ## Photos:  (${this.photos.length})
    ## Caption: (${this.caption})
    ## Likes: (${this.likes.length})
    ## Travel History: ${this.name} has visited ${this.travelHistory}


    ${this.photos
      .map(
        (photo) => `### ${photo.photoName}
       `
      )
      .join("\n")}`;
  }
}
module.exports = User
