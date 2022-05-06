const mongoose = require("mongoose");
require("../db/conn");

const mealSchema = mongoose.Schema({
  mealApiId: {
    type: String,
    require: true,
  },
  mealName: {
    type: String,
    require: true,
  },
  ingredients: [
    {
      ingredientName: {
        type: String,
        require: true,
      },
      measure: {
        type: String,
      },
      calorieCount: {
        type: Number,
      },
    },
  ],
  mealImg: {
    type: String,
    require: true,
  },
  videoLink: {
    type: String,
  },
  totalCalorieCount: {
    type: Number,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
});
const Meal = mongoose.model("Meal", mealSchema);
module.exports = Meal;
