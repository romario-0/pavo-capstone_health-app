const DailyCalorie = require("../models/dailyCalorie.model");
const dotenv = require("dotenv");
dotenv.config("../.env");

const addDailyCalorie = async (req, res) => {
  try {
    // let currentDate = new Date();
    console.log(Date());
    if (!req.body.date <= Date()) {
      return res.json({
        message: "Please enter valid date..",
      });
    }
    const obj = {
      date: req.body.date,
      calorieCount: req.body.calorieCount,
      userId: req.user.id,
    };
    const data = new DailyCalorie(obj);
    const response = await data.save();
    //save data into db
    res.json({
      message: "Calorie Added Successfully",
      dailyCalorie: response,
    });
  } catch (error) {
    console.log(error);
  }
};

// const updateDailyCalorie = async (req, res) => {
//   try {

//   } catch (error) {
//     console.log(error);
//   }
// }

const getDailyCalorie = async (req, res) => {
  try {
    const getDailyCalories = await DailyCalorie.find({
      userId: req.user.id,
      $and: [
        { date: { $gt: req.body.fromDate } },
        { date: { $lt: req.body.toDate } },
      ],
    });
    // console.log(getDailyCalories);
    res.json({
      message: "Daily Calories Fetched..",
      dailyCalorie: getDailyCalories,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addDailyCalorie, getDailyCalorie };
