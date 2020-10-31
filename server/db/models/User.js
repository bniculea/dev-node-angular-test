const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  country: String,
  age: Number,
});

module.exports = Mongoose.model("User", UserSchema);
