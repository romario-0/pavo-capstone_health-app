const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { authorization } = require("../middlewares/auth.middleware");
const { uploadProfile } = require("../middlewares/global.middleware");

// add user route i.e. SignUp
router.post("/userAdd", userController.addUser);

//Login user route
router.post("/userLogin", userController.loginUser);

//get user detail route
router.get("/userGet", authorization, userController.getUser);

//update user details route
router.post(
  "/userUpdate",
  authorization,
  uploadProfile.single("profilepic"),
  userController.updateUser
);

//dashboard route
router.get("/dashboard", authorization, userController.getDashboard);

//change user password
router.post("/changePassword", authorization, userController.changePassword);

module.exports = router;
