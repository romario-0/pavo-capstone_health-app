const User = require("../models/user.model");
const global = require("../middlewares/global.middleware");
const dotenv = require("dotenv");
dotenv.config("../.env");

const getUser = async (req, res) => {
  try {
    let loggedInUserId = global.getUserId(req.headers.authorization);
    const getUserDetail = await User.findById({ _id: loggedInUserId }).select(
      "-password"
    );
    res.json({ userDetail: getUserDetail });
  } catch (err) {
    console.log(err);
  }
};

const addUser = async (req, res) => {
  try {
    const checkEmail = await User.findOne({ email: req.body.email }); // checking email is allreday taken or not
    if (checkEmail) {
      res.json({ message: "Email is already Registerd.." });
    } else {
      const data = new User(req.body);
      const response = await data.save();
      res.json({
        message: "Registration Done",
        _id: response._id,
        fullName: response.fullname,
        email: response.email,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUser, addUser };
