const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/product_category.controller');
const upload = require('../middleware/upload.middleware');
const validateCategory = require('../validations/category.validation');

router.post('/category', upload.single('image'), validateCategory, categoryController.createProductCategory);
router.get('/category', categoryController.getAllCategories);
router.get('/category/:id', categoryController.getCategoryById);
router.put('/category/:id', upload.single('image'), validateCategory, categoryController.updateCategory);
router.delete('/category/:id', categoryController.deleteCategory);

module.exports = router;