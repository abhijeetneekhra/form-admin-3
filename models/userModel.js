const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Firstname is required"],
    },
    middlename: {
      type: String,
    },
    lastname: {
      type: String,
      required: [true, "Lastname is required"],
    },
    course: {
      type: String,
      required: [true, "Course is required"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
    },
    currentAddress: {
      type: String,
      required: [true, "Current Address is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    reTypePassword: {
      type: String,
      required: [true, "Re-type Password is required"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
