const DailyCalorie = require("../models/dailyCalorie.model");
const dotenv = require("dotenv");
dotenv.config("../.env");

const addDailyCalorie = async (req, res) => {
  try {
    const obj = {
      date: req.body.date,
      calorieCount: req.body.calorieCount,
      userId: req.user.id,
    };

    const checkDateCalorie = await DailyCalorie.findOne({
      userId: req.user.id,
      date: req.body.date,
    });

    if (checkDateCalorie) {
      try {
        const updateDailyCalorie = await DailyCalorie.updateOne(
          { _id: checkDateCalorie._id },
          { calorieCount: req.body.calorieCount }
        );
        return res.status(201).json({
          message: "Calorie Updated Successfully. ✔✌",
          updateDailyCalorie: updateDailyCalorie,
        });
      } catch (error) {
        console.log(error);
        res.json({
          message: error,
        });
      }
    } else {
      const data = new DailyCalorie(obj);
      const response = await data.save();
      //save data into db
      return res.json({
        message: "Calorie Added Successfully. ✔✌",
        dailyCalorie: response,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getDailyCalorie = async (req, res) => {
  try {
    const getDailyCalories = await DailyCalorie.find({
      userId: req.user.id,
      $and: [
        { date: { $gt: req.body.fromDate } },
        { date: { $lt: req.body.toDate } },
      ],
    });
    res.json({
      message: "Daily Calories Fetched..",
      dailyCalorie: getDailyCalories,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addDailyCalorie, getDailyCalorie };
