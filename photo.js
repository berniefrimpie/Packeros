class Photo {
  constructor(photoName) {
    this.photoName = photoName;
    this.likedBy = [];
    this.commentedBy = [];
  }
}
module.exports = Photo;