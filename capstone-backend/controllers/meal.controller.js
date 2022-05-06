const User = require("../models/user.model");
const Meal = require("../models/meal.model");
const Calorie = require("../models/ingredientcaloriecounts.model");
const dotenv = require("dotenv");
// const axios = require("axios");
dotenv.config("../.env");

const addMeal = async (req, res) => {
  try {
    // finding usersList
    const usersList = await Meal.find({ userId: req.user.id });

    // checking meal is alreday exists or not
    const checkMeal = usersList.find(
      (meal) => meal.mealApiId == req.body.mealApiId
    );

    if (checkMeal) {
      res.json({ message: "This meal is already added in your list." });
    } else {
      const ingredients = req.body.ingredients;
      let totalCalorieCount = 0;
      for (let i = 0; i < ingredients.length; i++) {
        const getCalorieCount = await Calorie.findOne({
          ingredientName: ingredients[i].ingredientName,
        });
        ingredients[i].calorieCount = getCalorieCount.calorieCount;
        totalCalorieCount += getCalorieCount.calorieCount;
      }
      const obj = {
        mealApiId: req.body.mealApiId,
        mealName: req.body.mealName,
        ingredients: ingredients,
        mealImg: req.body.mealImg,
        videoLink: req.body.videoLink,
        totalCalorieCount: totalCalorieCount,
        userId: req.user.id,
      };
      const data = new Meal(obj);
      const response = await data.save();
      //save data into db
      res.json({
        message: "Meal Added Successfully",
        meal: response,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteMeal = async (req, res) => {
  try {
    const selectedMeal = await findOneAndDelete(
      { _id: req.body.id },
      function (err, response) {
        if (err) {
          res.json({ message: err.message });
        } else {
          res.json({ message: "Deleted Meal", deletedMeal: response });
        }
      }
    );
    console.log(selectedMeal);
  } catch (error) {
    console.log(error);
  }
};

const getMeal = async (req, res) => {
  try {
    const usersList = await Meal.find({ userId: req.user.id });
    res.json(
      usersList
        ? { mealList: usersList, message: "List fetched." }
        : { message: "Your List is empty." }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addMeal, deleteMeal, getMeal };
