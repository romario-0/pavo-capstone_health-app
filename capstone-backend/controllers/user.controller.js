const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const global = require("../middlewares/global.middleware");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config("../.env");

const getUser = async (req, res) => {
  try {
    let loggedInUserId = global.getUserId(req.headers.authorization); //passing token in headers
    const getUserDetail = await User.findById({ _id: loggedInUserId }).select(
      //returns user details i.e.person who logged in
      "-password"
    );
    res.json({ userDetail: getUserDetail });
  } catch (err) {
    console.log(err);
  }
};

const addUser = async (req, res) => {
  try {
    const checkEmail = await User.findOne({ email: req.body.email }); // checking email is alreday taken or not
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
    const checkEmail = await User.findOne({ email: req.body.email }); //comparing email
    console.log(checkEmail);
    if (checkEmail) {
      let matchPassword = await bcrypt.compare(
        //hashing password
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
          process.env.ACCSESS_TOKEN_SECRET_kEY,
          {
            expiresIn: "2h", //token expires in 2 hours
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

const updateUser = async (req, res) => {
  try {
    // taking user id from Headers
    let loggedInUserId = global.getUserId(req.headers.authorization);

    // Checking profile picture of user
    const getProfileImg = await User.findById({ _id: loggedInUserId }).select(
      "profilepic"
    );
    // console.log(      `this is converted to string ${getProfileImg.profilepic.data.toString()}`    );

    let imgData = getProfileImg.profilepic.data;
    let imgContent = getProfileImg.profilepic.contentType;

    //in db profilepicture is unavaliable
    if (req.file === undefined) {
      console.log("if undefined file");
      imgData;
      imgContent;
    } else {
      //
      console.log("if file is available");
      imgData = req.file.filename;
      imgContent = req.file.mimetype;
    }

    // console.log(`${imgData} -- ${imgContent}`);

    const {
      fullname,
      //email,
      // password,
      phone,
      gender,
      goal,
      height,
      weight,
      age,
      neck,
      waist,
      hip,
      activity,
    } = req.body;
    const obj = {
      fullname,
      // email,
      //password,
      phone,
      gender,
      goal,
      height,
      weight,
      age,
      neck,
      waist,
      hip,
      activity,
      profilepic: { data: imgData, contentType: imgContent },
    };
    console.log(obj);
    try {
      const updateUserDetail = await User.updateOne(
        { _id: loggedInUserId },
        obj
      );
      console.log(updateUserDetail);
      res.status(201).json({
        message: "User Updated Successfully. ✔✌",
      });
    } catch (error) {
      console.log(error);
      res.json({
        message: error,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const getDashboard = async (req, res) => {
  let loggedInUserId, idealWeightOfUser, bmiOfUser;
  try {
    loggedInUserId = global.getUserId(req.headers.authorization);
    const getUserDetail = await User.findById({ _id: loggedInUserId }).select(
      "-password"
    );

    // idealWeight
    const idealWeight = {
      method: "GET",
      url: "https://fitness-calculator.p.rapidapi.com/idealweight",
      params: { gender: getUserDetail.gender, height: getUserDetail.height },
      headers: {
        "X-RapidAPI-Host": "fitness-calculator.p.rapidapi.com",
        "X-RapidAPI-Key": "56d21850d0msh562e0fff5e3f167p167d1cjsnf6ba583a1812",
      },
    };
    idealWeightOfUser = await axios.request(idealWeight);
    // console.log(idealWeightOfUser.data.data);

    // Bmi
    const bmi = {
      method: "GET",
      url: "https://fitness-calculator.p.rapidapi.com/bmi",
      params: {
        age: getUserDetail.age,
        weight: getUserDetail.weight,
        height: getUserDetail.height,
      },
      headers: {
        "X-RapidAPI-Host": "fitness-calculator.p.rapidapi.com",
        "X-RapidAPI-Key": "56d21850d0msh562e0fff5e3f167p167d1cjsnf6ba583a1812",
      },
    };
    bmiOfUser = await axios.request(bmi);
    // console.log(bmiOfUser.data.data);

    res.json({
      user: getUserDetail,
      idealWeightOfUser: idealWeightOfUser.data.data,
      bmi: bmiOfUser.data.data,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUser,
  addUser,
  loginUser,
  updateUser,
  getDashboard,
};
