//1. create a db.js file
//2. import mongoose and connect it to a url

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/paytm", {
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

//4.create a bank related schema
const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, //cannot define the objectid directly
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: type,
  },
});

//create a model for the Bank schema
const Account = mongoose.model("Account", accountSchema);

//create a model for the User schema
const User = mongoose.model("User", userSchema);

//4.export the mongoose model
module.exports = {
  User,
  Account,
};
