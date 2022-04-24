const express = require("express");
const router = express.Router();

const foodController = require("../controllers/food.controller");

router.get("/get-categories", foodController.getFoodCategories);
router.get("/get-ingredients", foodController.getFoodIngredients);
router.get("/get-meals", foodController.getMealsByType);
router.get("/get-recipe", foodController.getRecipeById);

module.exports = router;
