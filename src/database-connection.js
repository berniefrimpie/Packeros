const mongoose = require("mongoose");

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DATABASE;

mongoose.set("debug", true);

mongoose
  .connect(
    `mongodb+srv://${username}:${password}@packleros.hbjt2.mongodb.net/${dbName}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )

  .then(() => console.log("connection established"))
  .catch(console.log);

// const Panada = mongoose.model("Panda", { name: String, age: Number });
// Panada.find().then(console.log);
