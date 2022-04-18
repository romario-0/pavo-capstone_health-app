const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const global = require("../middlewares/global.middleware");
const bcrypt = require("bcrypt");
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

const loginUser = async (req, res) => {
  try {
    const checkEmail = await User.findOne({ email: req.body.email });
    console.log(checkEmail);
    if (checkEmail) {
      let matchPassword = await bcrypt.compare(
        req.body.password,
        checkEmail.password
      );
      if (matchPassword) {
        let Token = jwt.sign(
          {
            id: checkEmail._id,
            fullname: checkEmail.fullname,
            email: checkEmail.email,
          },
          process.env.ACCESS_TOKEN_SECRET_KEY,
          {
            expiresIn: "2h",
          }
        );
        return res.status(201).json({
          message: "Login Successfull",
          userToken: Token,
          User: checkEmail.fullname,
        });
      } else {
        return res.json({ message: "Invalid Password" });
      }
    } else {
      res.status(301).json({ message: "User is not Registered" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getUser, addUser, loginUser };
