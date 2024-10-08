const db = require('../config/database');

// Create a new employee
const createEmployee = async (employeeData) => {
    const { user_id, emp_name, emp_email, number, age, gender, salary, address } = employeeData;

    const existingUser = await getUserByMail(emp_email);

    if (existingUser) {
        throw new Error('Email already in use');
    }
    const sql = `INSERT INTO employee_information (user_id, emp_name, emp_email, number, age, gender, salary, address)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await db.execute(sql, [user_id, emp_name, emp_email, number, age, gender, salary, address]);
    return result;
};

const getUserByMail = async (email) => {
    const sql = 'SELECT * FROM employee_information WHERE emp_email = ?';
    const [results] = await db.execute(sql, [email]);
    return results[0];
}

// Get a paginated list of employees by user ID
const getEmployeesByUserId = async (user_id) => {

    const sql = `SELECT * FROM employee_information WHERE user_id = ?`;
    const [rows] = await db.execute(sql, [user_id]);

    return rows;
};

// Get all list of employees
const getAllEmployees = async () => {
    const sql = 'SELECT * FROM employee_information';
    const [results] = await db.execute(sql);
    return results;
};

// Delete employee by id
const deleteEmployees = async (emp_id) => {
    const sql = 'DELETE FROM employee_information WHERE emp_id = ?';
    const [results] = await db.execute(sql, [emp_id]); // Add await here
    return results;
}

module.exports = {
    createEmployee,
    getEmployeesByUserId,
    getAllEmployees,
    deleteEmployees
};
