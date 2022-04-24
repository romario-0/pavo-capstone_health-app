const axios = require("axios");

// Fetch ingredient list
const getFoodIngredients = async (req, res) => {
  try {
    const ingredients = await axios.get(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);

    if(ingredients){
        res.json({ data : ingredients.data }); //returns all ingredients
    }
  } catch (err) {
    console.log(err);
  }
};

// Fetch category list
const getFoodCategories = async (req, res) => {
  try {
    const categories = await axios.get(`https://www.themealdb.com/api/json/v1/1/categories.php`);

    if(categories){
        res.json({ data : categories.data }); //returns all categories
    }
  } catch (err) {
    console.log(err);
  }
};

// Fetch meal list based on ingredient or category
const getMealsByType = async (req, res) => {
  try {
    const value = req.query.value;
    const type = req.query.type;

    let filter = 'c';

    if('INGREDIENT' === type.toUpperCase()){
      filter = 'i';
    }else{
      filter = 'c';
    }

    const meals = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?${filter}=${value}`);

    if(meals){
        res.json({ data : meals.data }); // Returns meals based on category or ingredient
    }
  } catch (err) {
    console.log(err);
  }
  };

  // Fetch recipe of single meal by ID
  const getRecipeById = async (req, res) => {
    try {
      const foodID = req.query.foodID;
      const meals = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodID}`);
  
      if(meals){
          res.json({ data : meals.data }); //returns meal recipe
      }
    } catch (err) {
      console.log(err);
    }
    };

module.exports = { getFoodIngredients, getFoodCategories, getMealsByType, getRecipeById };
