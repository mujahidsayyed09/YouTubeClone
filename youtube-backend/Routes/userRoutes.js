const express = require("express");
const router = express.Router();
const UserController = require('../Controllers/userController');

router.post("/signUp", UserController.signUp);
router.post("/login", UserController.signIn);
router.post("/logout",UserController.logout);






module.exports = router;