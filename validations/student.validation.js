const { body } = require('express-validator');

const validateStudent = [
    body('user_id').notEmpty().isInt().withMessage('User ID must be a valid integer'),
    body('name').notEmpty().withMessage('Student name is required'),
    body('email').isEmail().withMessage('Valid student email is required'),
    body('number').notEmpty().withMessage('Contact number is required'),
    body('age').isInt({ min: 18 }).withMessage('Age must be a valid number'),
    body('gender').isIn(['Male', 'Female']).withMessage('Gender must be Male or Female'),
    body('address').notEmpty().withMessage('Address is required')
];

module.exports = validateStudent;
