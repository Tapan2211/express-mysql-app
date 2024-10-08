const { body } = require('express-validator');

const validateEmployee = [
    body('user_id').notEmpty().isInt().withMessage('User ID must be a valid integer'),
    body('emp_name').notEmpty().withMessage('Employee name is required'),
    body('emp_email').isEmail().withMessage('Valid employee email is required'),
    body('number').notEmpty().withMessage('Contact number is required'),
    body('age').isInt({ min: 18 }).withMessage('Age must be a valid number'),
    body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Gender must be Male, Female, or Other'),
    body('salary').isFloat({ min: 0 }).withMessage('Salary must be a positive number'),
    body('address').notEmpty().withMessage('Address is required')
];

module.exports = validateEmployee;