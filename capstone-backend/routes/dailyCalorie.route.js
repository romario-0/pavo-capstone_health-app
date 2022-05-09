const express = require("express");
const router = express.Router();
const { authorization } = require("../middlewares/auth.middleware");

const dailyCalorieController = require("../controllers/dailyCalorie.controller");

router.post(
  "/addDailyCalorie",
  authorization,
  dailyCalorieController.addDailyCalorie
);
router.get(
  "/getDailyCalorie",
  authorization,
  dailyCalorieController.getDailyCalorie
);

module.exports = router;
