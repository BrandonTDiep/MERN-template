const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productController");
const requireAuth = require('../middleware/requireAuth')


// require auth for all product routes
router.use(requireAuth)

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