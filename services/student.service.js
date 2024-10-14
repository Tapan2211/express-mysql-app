const studentModel = require('../models/student.model');

const createStudent = async (data) => {
    return await studentModel.createStudent(data)
}

const getAllStudent = async () => {
    return await studentModel.getAllStudent();
}

const getStudentById = async (id) => {
    return await studentModel.getStudentById(id);
}

const deleteStudent = async (id) => {
    console.log("SERVIC_ID", id)
    return await studentModel.deleteStudent(id);
}

module.exports = {
    createStudent,
    getAllStudent,
    getStudentById,
    deleteStudent
}