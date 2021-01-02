const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: false
    },
    password_digest: {
      type: String,
      required: true,
      unique: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", User);
