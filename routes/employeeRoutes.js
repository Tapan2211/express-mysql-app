const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const validateEmployee = require('../validations/employeeValidation');

// Create an employee
router.post('/employees', validateEmployee, employeeController.createEmployee);

// Get employees by user ID
router.get('/employees/:user_id', employeeController.getEmployeesByUserId);
// Get all employees
router.get('/employees', employeeController.getAllEmployees);
// Delete employee by id
router.delete('/employees/:id', employeeController.deleteEmployee);

module.exports = router;
