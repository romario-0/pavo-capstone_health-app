const mongoose = require("mongoose");
require("../db/conn");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    phone: {
      type: Number,
      require: true,
    },
    gender: {
      type: String,
      require: true,
    },
    profilepic: {
      data: Buffer,
      contentType: String,
    },
    goal: {
      //for user goal.. ex.weight loss or gain
      type: String,
    },
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    age: {
      type: Number,
    },
    neck: {
      type: Number,
    },
    waist: {
      type: Number,
    },
    hip: {
      type: Number,
    },
    activitylevel: {
      //ex. no excercise, 3 times in week, 5 times in week, 6 times in week
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
