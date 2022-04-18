const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config("../.env");

const getUser = async (req, res) => {
  try {
    const getUserDetail = await User.findById({ _id: req.user.id }).select(
      "-password"
    );
    res.json({ userDetail: getUserDetail });
  } catch (err) {
    console.log(err);
  }
};

const addUser = async (req, res) => {
  try {
    const userEmail = await User.findOne({ email: req.body.email }); // checking email is allreday taken or not
    if (userEmail) {
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
    const userEmail = await User.findOne({ email: req.body.email });
    // console.log(userEmail);
    if (userEmail) {
      let matchPassword = await bcrypt.compare(
        //hashing password
        req.body.password,
        userEmail.password
      );
      if (matchPassword) {
        let Token = jwt.sign(
          {
            id: userEmail._id,
            fullname: userEmail.fullname,
            email: userEmail.email,
          },
          process.env.ACCSESS_TOKEN_SECRET_kEY,
          {
            expiresIn: "2h", //token expires in 2 hours
          }
        );
        return res.status(201).json({
          message: "Login Successfull",
          userToken: Token,
          User: userEmail.fullname,
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
    // Checking profile picture of user
    const getProfileImg = await User.findById({ _id: req.user.id }).select(
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
  let idealWeightOfUser, bmiOfUser, bodyFatOfUser;
  try {
    const getUserDetail = await User.findById({ _id: req.user.id }).select(
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
    console.log(bmiOfUser.data.data);

    // body fat percentage
    const bodyFat = {
      url: "https://fitness-calculator.p.rapidapi.com/bodyfat",
      params: {
        age: getUserDetail.age,
        gender: getUserDetail.gender,
        weight: getUserDetail.weight,
        height: getUserDetail.height,
        neck: getUserDetail.neck,
        waist: getUserDetail.waist,
        hip: getUserDetail.hip,
      },
      headers: {
        "X-RapidAPI-Host": "fitness-calculator.p.rapidapi.com",
        "X-RapidAPI-Key": "56d21850d0msh562e0fff5e3f167p167d1cjsnf6ba583a1812",
      },
    };
    bodyFatOfUser = await axios.request(bodyFat);
    // console.log(bodyFatOfUser.data.data);

    res.json({
      user: getUserDetail,
      idealWeightOfUser: idealWeightOfUser.data.data,
      bmiOfUser: bmiOfUser.data.data,
      bodyFatOfUser: bodyFatOfUser.data.data,
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
