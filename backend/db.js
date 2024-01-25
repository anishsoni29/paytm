//1. create a db.js file
//2. import mongoose and connect it to a url

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/test_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//3. create a mongoose User schema

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
});

//create a model for the schema
const User = mongoose.model("User", userSchema);

//4.export the mongoose model
module.exports = {
  User,
};
