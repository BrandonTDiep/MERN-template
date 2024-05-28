const express = require("express");
const router = express.Router();
const Product = require("../models/products")
const productsController = require("../controllers/productController");


//create instance of router 

// GET all products

router.get('/', productsController.getProducts)

// GET a single product
router.get('/:id', productsController.getProduct)

// POST a new product
router.post('/', productsController.createProduct)

// DELETE a new product
router.delete('/:id', productsController.deleteProduct)

// UPDATE a new product
router.patch('/:id', productsController.updateProduct)

module.exports = router;