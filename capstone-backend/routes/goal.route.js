const express = require("express");
const router = express.Router();
const goalController = require("../controllers/goal.controller");

router.get("/getGoal", goalController.getUserGoal);

module.exports = router;
