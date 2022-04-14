const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/userAdd", userController.addUser);

module.exports = router;
