const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config("../.env");
const path = require("path");

const getUser = async (req, res) => {
  try {
    const getUserDetail = await User.findById({ _id: req.user.id }).select(
      "-password"
    );
    res.json({ userDetail: getUserDetail }); //returns all user details
  } catch (err) {
    console.log(err);
  }
};

const addUser = async (req, res) => {
  try {
    const userEmail = await User.findOne({ email: req.body.email }); // checking email is alreday taken or not
    if (userEmail) {
      res.json({ message: "Email is already Registerd.." });
    } else {
      const userData = {
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        gender: req.body.gender,
        profilepic: {
          data: "https://drive.google.com/file/d/1OiX69mNDf7KH_jMXepcjjgXi5jsmLQAM/view?usp=sharing",
          contentType: "image/jpeg",
        },
      };
      const data = new User(userData);
      const response = await data.save(); //save data into db
      res.json({
        message: "Registration Done",
        _id: response._id,
        user: {
          id: response._id,
          fullname: response.fullname,
          email: response.email,
          phone: response.phone,
          gender: response.gender,
          profilepic: response.profilepic.data.toString(),
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const userEmail = await User.findOne({ email: req.body.email }); //verifing email
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
          process.env.ACCESS_TOKEN_SECRET_KEY,
          {
            expiresIn: "2h", //token expires in 2 hours
          }
        );
        return res.status(201).json({
          message: "Login Successfull",
          userToken: Token,
          user: {
            id: userEmail._id,
            fullname: userEmail.fullname,
            email: userEmail.email,
            phone: userEmail.phone,
            gender: userEmail.gender,
            profilepic: userEmail.profilepic.data.toString(),
          },
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
      // console.log("if undefined file");
      imgData;
      imgContent;
    } else {
      // console.log("if file is available");
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
      activityLevel,
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
      activityLevel,
      profilepic: { data: imgData, contentType: imgContent },
    };
    // console.log(obj);
    try {
      const updateUserDetail = await User.updateOne({ _id: req.user.id }, obj);
      // console.log(updateUserDetail);
      res.status(201).json({
        message: "User Updated Successfully. ✔✌",
        updateUserDetail: updateUserDetail,
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
  const Nodata = { message: "No Data.." };

  try {
    const getUserDetail = await User.findById({ _id: req.user.id }).select(
      "-password"
    );

    // motivational quotes
    const quotes = {
      method: "POST",
      url: "https://motivational-quotes1.p.rapidapi.com/motivation",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Host": "motivational-quotes1.p.rapidapi.com",
        "X-RapidAPI-Key": "56d21850d0msh562e0fff5e3f167p167d1cjsnf6ba583a1812",
      },
      data: '{"key1":"value","key2":"value"}',
    };
    //fetching from api
    motivationalQuote = await axios.request(quotes);
    // console.log(motivationalQuote.data);

    // // checkig purpuse
    // console.log(`${getUserDetail.height}
    //   ${getUserDetail.weight}
    //   ${getUserDetail.goal}
    //   ${getUserDetail.age}
    //   ${getUserDetail.hip}
    //   ${getUserDetail.neck}
    //   ${getUserDetail.waist}
    //   ${getUserDetail.activity}`);

    // idealWeight
    if (getUserDetail.height && getUserDetail.gender) {
      const idealWeight = {
        method: "GET",
        url: "https://fitness-calculator.p.rapidapi.com/idealweight",
        params: { gender: getUserDetail.gender, height: getUserDetail.height },
        headers: {
          "X-RapidAPI-Host": "fitness-calculator.p.rapidapi.com",
          "X-RapidAPI-Key":
            "56d21850d0msh562e0fff5e3f167p167d1cjsnf6ba583a1812",
        },
      };
      //fetching from api
      idealWeightOfUser = await axios.request(idealWeight);
      // console.log(idealWeightOfUser.data.data);
    }

    // Bmi
    if (getUserDetail.height && getUserDetail.weight && getUserDetail.age) {
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
          "X-RapidAPI-Key":
            "56d21850d0msh562e0fff5e3f167p167d1cjsnf6ba583a1812",
        },
      };
      //fetching from api
      bmiOfUser = await axios.request(bmi);
      // console.log(bmiOfUser.data.data);
    }

    // body fat percentage
    if (
      getUserDetail.height &&
      getUserDetail.weight &&
      getUserDetail.gender &&
      getUserDetail.age &&
      getUserDetail.hip &&
      getUserDetail.neck &&
      getUserDetail.waist
    ) {
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
        }, //fetching details from DB
        headers: {
          "X-RapidAPI-Host": "fitness-calculator.p.rapidapi.com",
          "X-RapidAPI-Key":
            "56d21850d0msh562e0fff5e3f167p167d1cjsnf6ba583a1812",
        },
      };
      bodyFatOfUser = await axios.request(bodyFat);
      // console.log(bodyFatOfUser.data.data);
    }

    if (!idealWeightOfUser && !bmiOfUser && !bodyFatOfUser) {
      return res.json({
        quote: motivationalQuote.data,
        user: getUserDetail,
        message: "Please fill your data..",
      });
    }
    res.json({
      quote: motivationalQuote.data,
      user: getUserDetail,
      idealWeightOfUser: idealWeightOfUser
        ? idealWeightOfUser.data.data
        : Nodata,
      bmiOfUser: bmiOfUser ? bmiOfUser.data.data : Nodata,
      bodyFatOfUser: bodyFatOfUser ? bodyFatOfUser.data.data : Nodata,
    }); //returns all details of user,idealweight,bmi,bodyfat
  } catch (error) {
    console.log(error);
  }
};

const changePassword = async (req, res) => {
  try {
    const getUserDetail = await User.findById({ _id: req.user.id }).select(
      "password"
    );
    console.log(getUserDetail);
    const oldPassword = req.body.oldPassword;
    console.log(oldPassword);
    const matchPassword = await bcrypt.compare(
      //hashing password
      req.body.oldPassword,
      getUserDetail.password
    );
    if (matchPassword) {
      const newPassword = await bcrypt.hash(req.body.newPassword, 12);

      const updatedPassword = await User.updateOne(
        { _id: req.user.id },
        { password: newPassword }
      );
      // console.log(updatedPassword);
      res.json({
        message: "Password Updated Successfully",
        status: updatedPassword,
      });
    } else {
      res.json({ message: "Password doesn't match" });
    }
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
  changePassword,
};
