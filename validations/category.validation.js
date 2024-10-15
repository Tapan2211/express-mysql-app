const { body } = require('express-validator');

const validateCategory = [
    body('category_name').notEmpty().withMessage('Category name is required'),
    body('description').notEmpty().withMessage('Description is required')
]

module.exports = validateCategory;