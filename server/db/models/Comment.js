const Mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  text: String,
  author: {
    id: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: String,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
