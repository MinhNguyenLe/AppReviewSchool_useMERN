const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      default: 0,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    cart: {
      type: Array,
      default: [],
      required: true,
    },
  },
  { timestamps: true, collection: "Users" }
);

module.exports = mongoose.model("Users", userSchema);

console.log("Login Model");