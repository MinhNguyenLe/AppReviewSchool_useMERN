const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    passWord: {
      type: String,
      required: true,
      trim: true,
    },
    eMail: {
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
  { timestamps: true, collection: "UsersData" }
);

module.exports = mongoose.model("UsersData", userSchema);
