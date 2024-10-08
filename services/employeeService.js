const employeeModel = require('../models/employeeModel');

// Create a new employee
const createEmployee = async (data) => {
    return await employeeModel.createEmployee(data);
};

// Get all employees for a specific user
const getEmployeesByUserId = async (userId) => {
    return await employeeModel.getEmployeesByUserId(userId);
};

// Get all employees list
const getAllEmployees = async () => {
    return await employeeModel.getAllEmployees();
};

// Update employee by id
const updateEmployee = async (id, data) => {
    return await employeeModel.updateEmployees(id, data);
}

// Delete employee by id
const deleteEmployee = async (id) => {
    return await employeeModel.deleteEmployees(id);
}

module.exports = {
    createEmployee,
    getEmployeesByUserId,
    getAllEmployees,
    updateEmployee,
    deleteEmployee
};
