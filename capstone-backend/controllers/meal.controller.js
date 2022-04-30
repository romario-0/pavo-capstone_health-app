const User = require("../models/user.model");
const Meal=require("../models/meal.model")
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config("../.env");

const addMeal = async (req, res) => {
  try {
    // finding userList
    const userList = await User.find({ userId: req.user.id })
    console.log(userList);


    const checkMeal=await userList.findOne({ mealApiId: req.body.mealApiId }); // checking meal is alreday exists or not
    if(checkMeal){
      res.json({message:"This meal is already added in your list."})
    }else{
      const obj={
        mealApiId:req.body.mealApiId,
        mealName: req.body.mealName,
        ingredients: [
          {
            ingredientName: req.body.ingredientName,
            measure: req.body.measure,
          },
        ],
        mealImg: req.body.mealImg,
        videoLink: req.body.videoLink,
        userId:req.user.id,
      };
       const data = new Meal(obj);
      const response = await data.save();
      //save data into db
      res.json({
        message: "Meal Added Successfully",
        // mealName: response.mealName,
        // ingredients: [
        //   {
        //     ingredientName: response.ingredientName,
        //     measure: response.measure,
        //   },
        // ],
        // mealImg: response.mealImg,
        // videoLink: response.videoLink,
      });
    }
   
  } catch (error) {
    console.log(error);
  }
};

const deleteMeal=async (req,res)=>{
  try {
    const selectedMeal= await findOneAndDelete({_id: req.body.id }, function (err, response) {
    if (err){
       res.json({message:err.message});
    }
    else{
       res.json({message:"Deleted Meal", deletedMeal:response});
    }
});
  } catch (error) {
    console.log(error);
  }
}

module.exports = { addMeal,deleteMeal };
