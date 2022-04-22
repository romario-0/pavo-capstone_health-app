const mongoose = require("mongoose");
require("../db/conn");

const goalSchema = mongoose.Schema({
  goal: {
    type: String,
    require: true,
  },
  goalImg: {
    type: String,
    require: true,
  },
});
const Goal = mongoose.model("Goal", goalSchema);
module.exports = Goal;
