const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories.controller');
const upload = require('../middleware/upload.middleware');
const validateCategories = require('../validations/category.validation');

router.post('/categories', upload.single('image'), validateCategories, categoriesController.createCategories);
router.get('/categories', categoriesController.getAllCategories);
// router.get('/categories/:id', categoriesController.getCategoriesById);
router.get('/categories/:product_category_id', categoriesController.getCategoriesByProductCategoryId);
router.put('/categories/:id', upload.single('image'), validateCategories, categoriesController.updateCategoryById);
router.delete('/categories/:id', categoriesController.deleteCategoryById);

module.exports = router;