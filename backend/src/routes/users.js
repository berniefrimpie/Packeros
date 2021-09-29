const express = require("express");

const router = express.Router();

const User = require("../models/user");
const Photo = require("../models/photo");
const Trip = require("../models/trip");

/* GET users listing. */
router.get("/", async (req, res) => {
  const query = {};

  if (req.query.name) {
    query.name = req.query.name;
  }

  if (req.query.age) {
    query.age = req.query.age;
  }

  res.send(await User.find(query));
});
/* POST create a user */
router.post("/", async (req, res) => {
  const createdUser = await User.create(req.body);
  res.send(createdUser);
});

router.get("/initialize", async (req, res) => {
  const userOne = await User.create({
    name: "Bernard",
    age: 28,
    email: "bernie@yahoo.com",
    location: "Dusseldorf, Germany",
  });
  const userTwo = await User.create({
    name: "Steve",
    age: 21,
    email: "bernie@yaho0.com",
    location: "Berlin, Germany",
  });

  const europeTrip = await Trip.create({
    destination: ["London", "Berlin"],
    date: new Date(),
  });

  const berlinPhoto = await Photo.create({ photoName: "Berlin.jpg" });
  const parisPhoto = await Photo.create({ photoName: "Paris.jpg" });
  const accraPhoto = await Photo.create({ photoName: "Accra.jpg" });
  const amsterdamPhoto = await Photo.create({ photoName: "Amsterdam.jpg" });
  const londonPhoto = await Photo.create({ photoName: "London.jpg" });
  const legosPhoto = await Photo.create({ photoName: "Legos.jpg" });

  // The photo names being pushed into the photos array.

  await userOne.addPhoto(londonPhoto);
  await userOne.addPhoto(berlinPhoto);
  await userOne.addPhoto(accraPhoto);
  await userTwo.addPhoto(legosPhoto);
  await userTwo.addPhoto(parisPhoto);

  // liked photos
  await userOne.likePhoto(parisPhoto);
  await userOne.likePhoto(legosPhoto);
  await userTwo.likePhoto(londonPhoto);
  await userOne.likePhoto(amsterdamPhoto);

  await userTwo.addComments(parisPhoto, "wow! nice parisPhoto");

  await userOne.addCaption(
    amsterdamPhoto,
    `These beautiful photos were taken in Berlin `
  ); // chande to captions
  await userTwo.addCaption(
    parisPhoto,
    `These nice photos were taken in Amsterdam `
  ); // chande to captions

  // Users travels history
  await userOne.addPastTrips("Accra");
  await userOne.addPastTrips("Berlin");
  await userOne.addPastTrips("London");
  await userOne.addPastTrips("Paris");
  await userTwo.addPastTrips("New York");
  await userTwo.addPastTrips("Legos");
  await userTwo.addPastTrips("Amsterdam");
  await userTwo.addPastTrips("Ghent");

  // Bios of current users.
  userOne.bio =
    "An experienced backpacker who has visited almost every country, and now wants to share the experiance with you."; // .blue.bold;
  userTwo.bio =
    "An awsome hacker who has seen it all, and now wants to experience the life of a backpacker.";

  await londonPhoto.save();
  await legosPhoto.save();
  await accraPhoto.save();
  await berlinPhoto.save();
  await parisPhoto.save();

  await userTwo.suggestTrip(europeTrip);

  console.log(userTwo.trips);

  console.log(userTwo);
  res.sendStatus(200);
});

router.post("/:userId/adds", async (req, res) => {
  const user = await User.findById(req.params.userId);
  const photo = await Photo.findById(req.body.photoId);

  await user.addPhoto(photo);
  res.sendStatus(200);
});

router.post("/:userId/likes", async (req, res) => {
  const user = await User.findById(req.params.userId);
  const photo = await Photo.findById(req.body.photoId);

  await user.likePhoto(photo);
  res.sendStatus(200);
});
router.get("/:userId", async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (user) res.render("user", { user });
  else res.sendStatus(404);
});

router.get("/:userId", async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (user) res.send(user);
  else res.sendStatus(404);
});

router.get("/:userId/json", async (req, res) => {
  const user = await User.findById(req.params.userId);
  res.send(user);
});

module.exports = router;
