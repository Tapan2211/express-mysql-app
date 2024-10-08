const employeeService = require('../services/employeeService');

// Create an employee
const createEmployee = async (req, res) => {
    try {
        const employee = await employeeService.createEmployee(req.body);
        res.status(201).json({
            message: 'Successfully created employee',
            employee: {
                emp_id: employee.insertId,  // Assuming you want to return the inserted ID
                ...req.body
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all employees by user ID
const getEmployeesByUserId = async (req, res) => {
    try {
        const employees = await employeeService.getEmployeesByUserId(req.params.user_id);
        if (!employees.length) {
            return res.status(404).json({ message: 'No employees found' });
        }
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all employees
const getAllEmployees = async (req, res) => {
    try {
        const employees = await employeeService.getAllEmployees();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update employee by id
const updateEployee = async (req, res) => {
    try {
        const emp_id = req.params.id;
        const updatedData = req.body;
        const result = await employeeService.updateEmployee(emp_id, updatedData);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.json({ message: 'Employee updated successfully', updatedData });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Delete employee by id
const deleteEmployee = async (req, res) => {
    try {
        const emp_id = req.params.id; // Get emp_id from request parameters
        const result = await employeeService.deleteEmployee(emp_id); // Call the delete service

        // Check if any rows were affected
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createEmployee,
    getEmployeesByUserId,
    getAllEmployees,
    updateEployee,
    deleteEmployee
};
