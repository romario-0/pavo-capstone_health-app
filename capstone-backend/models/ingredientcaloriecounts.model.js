const mongoose = require("mongoose");
require("../db/conn");

const ingredientCalorieCountsSchema = mongoose.Schema({
  ingredientID: {
    type: Number,
  },
  ingredientName: {
    type: String,
  },
  ingredientType: {
    type: String,
  },
  calorieCount: {
    type: Number,
  },
});
const ingredientcaloriecount = mongoose.model(
  "ingredientcaloriecount",
  ingredientCalorieCountsSchema
);
module.exports = ingredientcaloriecount;
