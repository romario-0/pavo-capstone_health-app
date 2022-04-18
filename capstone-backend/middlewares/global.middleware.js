const dotenv = require("dotenv");
dotenv.config("../.env");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const User = require("../models/user.model");
const profileImageUploadPath = path.join(__dirname, "../img/profilepic");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log(profileImageUploadPath);
    cb(null, `${profileImageUploadPath}`);
  },
  filename: async (req, file, cb) => {
    let loggedInUserId = getUserId(req.headers.authorization);
    const getId = await User.findById({ _id: loggedInUserId }).select("_id");
    // console.log(getId._id);
    if (file === undefined) {
      cb(null, false);
    } else {
      let extension = path.extname(file.originalname);
      // cb(null, Date.now() + "-" + file.originalname);
      cb(null, getId._id + extension);
    }
  },
});

const uploadProfile = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    // console.log(file);
    if (file === undefined) {
      cb(null, false);
    } else {
      let extension = path.extname(file.originalname);
      if (
        extension !== ".png" &&
        extension !== ".jpg" &&
        extension !== ".jpeg"
      ) {
        cb(null, false);
        return cb(new Error("Only imagesare allowed"));
      }
      cb(null, true);
    }
  },
});

module.exports = { uploadProfile };
