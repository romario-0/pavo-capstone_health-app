const Activity = require("../models/activity.model");

const getUserActivity = async (req, res) => {
  try {
    const activityDetail = await Activity.find();
    res.json({ allActivities: activityDetail }); //returns all activities
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getUserActivity };
