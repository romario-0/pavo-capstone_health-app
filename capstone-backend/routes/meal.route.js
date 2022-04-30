const express = require("express");
const router = express.Router();
const { authorization } = require("../middlewares/auth.middleware");

const mealController = require("../controllers/meal.controller");

router.post("/addMeal", authorization, mealController.addMeal);
// router.post("/addIngredient", mealController.addIngredient);

module.exports = router;
