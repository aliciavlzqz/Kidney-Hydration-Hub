const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  liters: {
    type: Number,
    required: true,
  },
  fluid: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
