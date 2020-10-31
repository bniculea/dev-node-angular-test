const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  country: String,
});

module.exports = Mongoose.model("User", UserSchema);
