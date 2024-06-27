const express = require("express");
const router = express.Router();
const Product = require("../models/products")
const usersController = require("../controllers/userController");

// login route
router.post('/login', usersController.loginUser)

// signup route
router.post('/signup', usersController.signupUser)

module.exports = router;