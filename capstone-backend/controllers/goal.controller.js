const Goal = require("../models/goal.model");

const getUserGoal = async (req, res) => {
  try {
    const GoalDetail = await Goal.find();
    res.json({ allGoals: GoalDetail }); //returns all user goal details
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getUserGoal };
