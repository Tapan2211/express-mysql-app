const { validationResult } = require('express-validator');
const userService = require('../services/userService');

const createUser = async (req, res) => {
    const errors = validationResult(req); // Use validationResult
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await userService.createUser(req.body);
        res.status(201).json({
            message: 'Successfully created user', user: {
                id: user.insertId, // Assuming you want to return the inserted ID
                name: req.body.name,
                email: req.body.email
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getUser = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUser();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        await userService.updateUser(req.params.id, req.body);
        const updatedUser = await userService.getUserById(req.params.id);
        res.json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        await userService.deleteUser(req.params.id);
        res.json({ message: 'User deleted successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser
};