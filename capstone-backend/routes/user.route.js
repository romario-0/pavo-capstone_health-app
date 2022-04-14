const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { authorization } = require("../middlewares/auth.middleware");

router.post("/userAdd", userController.addUser);
router.post("/userLogin", userController.loginUser);
router.get("/userGet", authorization, userController.getUser);

module.exports = router;
