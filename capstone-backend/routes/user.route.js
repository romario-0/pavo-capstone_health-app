const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { authorization } = require("../middlewares/auth.middleware");
const { uploadProfile } = require("../middlewares/global.middleware");

router.post("/userAdd", userController.addUser);
router.post("/userLogin", userController.loginUser);
router.get("/userGet", authorization, userController.getUser);
router.post(
  "/userUpdate",
  authorization,
  uploadProfile.single("profilepic"),
  userController.updateUser
);
router.get("/dashboard", authorization, userController.getDashboard);

module.exports = router;
