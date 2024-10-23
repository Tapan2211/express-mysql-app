const db = require('../config/database');

const createUser = async (userData) => {
    const { name, email, password } = userData;
    if (!name || !email || !password) {
        throw new Error('Name, email, and password must not be undefined');
    }

    const existingUser = await getUserByMail(email);
    if (existingUser) {
        throw new Error('Email already in use');
    }
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    const [results] = await db.execute(sql, [name, email, password]);
    return results;
}

const getUserByMail = async (email) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const [results] = await db.execute(sql, [email]);
    return results[0];
}

const getUserById = async (id) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    const [row] = await db.execute(sql, [id]); // Add await here
    return row[0];
}

const getAllUsers = async () => {
    const sql = 'SELECT * FROM users';
    const [results] = await db.execute(sql);
    return results;
}

const updateUser = async (id, userData) => {
    const { name, email, password } = userData;
    const sql = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?';
    const [results] = await db.execute(sql, [name, email, password, id]);
    return results;
}

const deleteUser = async (id) => {
    const sql = 'DELETE FROM users WHERE id = ?';
    const [results] = await db.execute(sql, [id]);
    return results;
}

module.exports = {
    createUser,
    getUserById,
    getUserByMail,
    getAllUsers,
    updateUser,
    deleteUser,
    deleteUser
}