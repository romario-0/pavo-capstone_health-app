const mongoose = require("mongoose");
require("../db/conn");

const activitySchema = mongoose.Schema({
  activitylevel: {
    type: String,
    require: true,
  },
  levelName: {
    type: String,
    require: true,
  },
});
const Activity = mongoose.model("Activity", activitySchema);
module.exports = Activity;
