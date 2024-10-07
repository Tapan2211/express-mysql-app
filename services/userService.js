const userModel = require('../models/userModel');

const createUser = async (data) => {
    return await userModel.createUser(data);
}

const getUserById = async (id) => {
    return await userModel.getUserById(id);
}

const getAllUser = async () => {
    return await userModel.getAllUsers();
}

const updateUser = async (id, data) => {
    return await userModel.updateUser(id, data);
}

const deleteUser = async (id) => {
    return await userModel.deleteUser(id);
}

module.exports = {
    createUser,
    getUserById,
    getAllUser,
    updateUser,
    deleteUser,
}