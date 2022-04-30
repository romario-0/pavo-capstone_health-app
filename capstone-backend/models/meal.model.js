const mongoose = require("mongoose");
require("../db/conn");

const mealSchema = mongoose.Schema({
  mealApiId: {
    type: mongoose.Schema.Types.ObjectId,
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
        require: true,
      },
    },
  ],
  mealImg: {
    type: String,
    require: true,
  },
  videoLink: {
    type: String,
    require: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
});
const Meal = mongoose.model("Meal", mealSchema);
module.exports = Meal;

