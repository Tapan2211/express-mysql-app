const db = require('../config/database');

const createStudent = async (studentData) => {
    const { user_id, name, email, age, gender, address, number } = studentData;

    // Log student data to check for undefined values
    console.log('Student Data:', studentData);

    const existingUser = await getStudentByMail(email);

    if (existingUser) {
        throw new Error('Email already in use');
    }

    const sql = `INSERT INTO student_info (user_id, name, email, age, gender, address, number) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;

    // Replace undefined values with null
    const [results] = await db.execute(sql, [
        user_id || null,
        name || null,
        email || null,
        age || null,
        gender || null,
        address || null,
        number || null
    ]);

    return results;
}

const getStudentByMail = async (email) => {
    const sql = `SELECT * FROM student_info WHERE email = ?`;
    const [results] = await db.execute(sql, [email]);
    return results[0];
}

const getAllStudent = async () => {
    const sql = 'SELECT * FROM student_info';
    const [results] = await db.execute(sql);
    return results;
}

const getStudentById = async (user_id) => {
    const sql = `SELECT * FROM student_info WHERE user_id = ?`;
    const [results] = await db.execute(sql, [user_id]);
    return results;
}

const deleteStudent = async (student_id) => {
    const sql = `DELETE FROM student_info WHERE user_id = ?`;
    try {
        const [results] = await db.execute(sql, [student_id]);
        return results; // This will include affectedRows
    } catch (error) {
        console.error('Error executing SQL delete:', error);
        throw error; // Rethrow to handle in the controller
    }
}

module.exports = {
    createStudent,
    getAllStudent,
    getStudentById,
    deleteStudent
};
