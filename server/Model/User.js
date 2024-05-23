const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    default: null,
    required:[true,"First Name is required"],
  },
  lastname: {
    type: String,
    default: null,
    required:[true,"Last Name is required"],
  },
  phone: {
    type: Number,
    default: null,
    required:[true,"Phone number is required"],
  },
  email: {
    type: String,
    unique: true,
    default: null,
    required:[true,"Email address is required"],
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);
