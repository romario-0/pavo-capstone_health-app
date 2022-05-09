const DailyCalorie = require("../models/dailyCalorie.model");
const dotenv = require("dotenv");
dotenv.config("../.env");

const addDailyCalorie = async (req, res) => {
  try {
    // let currentDate = new Date();
    console.log(Date());
    const obj = {
      Date: Date(),
      CalorieCount: req.body.CalorieCount,
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

const getDailyCalorie = async (req, res) => {
  try {
    const getDailyCalories = await DailyCalorie.find({ userId: req.user.id });
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
