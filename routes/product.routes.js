const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const upload = require('../middleware/upload.middleware');

router.post('/products', upload.single('image'), productController.createProduct);
router.get('/products', productController.getAllProduct);
router.get('/products/category/:id', productController.getllProductByCategoryId);
router.get('/products/:id', productController.getProductById);
router.put('/products/:id', productController.updateProductById);
router.delete('/products/:id', productController.deleteProductById);

module.exports = router;