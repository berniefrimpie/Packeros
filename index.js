
const User = require("./user");

const Photo = require("./photo");


// Instances of the User class.
const userOne = new User("Bernard", 28, "bernie@yahoo.com");
const userTwo = new User("Steve", 21, "steve@yaho0.com");


// Instances of the Photo class.
const parisPhoto = new Photo("Paris.jpg");
const londonPhoto = new Photo("London.jpg");
const legosPhoto = new Photo("Legos.jpg");
const berlinPhoto = new Photo("Berlin.jpg");
const accraPhoto = new Photo("Accra.jpg");
const amsterdamPhoto = new Photo("Amsterdam.jpg");

// The photo names being pushed into the photos array.

userOne.addPhoto(londonPhoto);
userOne.addPhoto(berlinPhoto);
userOne.addPhoto(accraPhoto);
userTwo.addPhoto(legosPhoto);
userTwo.addPhoto(parisPhoto);

// liked photos
userOne.likePhoto(parisPhoto);
userOne.likePhoto(legosPhoto);
userTwo.likePhoto(londonPhoto);
userOne.likePhoto(amsterdamPhoto);

// Users commenting on photos.
userOne.commentOnPhoto(legosPhoto);
userOne.commentOnPhoto(parisPhoto);
userOne.commentOnPhoto(parisPhoto);

userOne.addCaption(`These beautiful photos were taken in Berlin `); // chande to captions
userTwo.addCaption(`These nice photos were taken in Amsterdam `); // chande to captions

// Users travels history
userOne.addTravelHistory("Accra");
userOne.addTravelHistory("Berlin");
userOne.addTravelHistory("London");
userOne.addTravelHistory("Paris");
userTwo.addTravelHistory("New York");
userTwo.addTravelHistory("Legos");
userTwo.addTravelHistory("Amsterdam");
userTwo.addTravelHistory("Ghent");

// Bios of current users.
userOne.bio =
  "An experienced backpacker who has visited almost every country, and now wants to share the experiance with you."; // .blue.bold;
userTwo.bio =
  "An awsome hacker who has seen it all, and now wants to experience the life of a backpacker.";


// Users online status.
userOne.logIn().isOnline = true;
userTwo.logOut().isOnline = false;

console.log(userOne);

console.log(userTwo.profile);
console.log(userOne.profile);
console.log("OMG Rainbows Everywhere!".rainbow);
