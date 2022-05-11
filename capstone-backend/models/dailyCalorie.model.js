const mongoose = require("mongoose");
require("../db/conn");

const DailyCalorieSchema = mongoose.Schema({
  Date: {
    type: Date,
    require: true,
  },
  CalorieCount: {
    type: Number,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
});
const DailyCalorie = mongoose.model("DailyCalorie", DailyCalorieSchema);
module.exports = DailyCalorie;
