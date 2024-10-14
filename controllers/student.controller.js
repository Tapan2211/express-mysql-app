const studentService = require('../services/student.service');

const createStudent = async (req, res) => {

    try {
        // Call the student service to create a student
        const student = await studentService.createStudent(req.body);
        res.status(201).json({
            message: 'Successfully created student',
            student_id: student.insertId,
            ...req.body
        });
    } catch (error) {
        console.error('Error in createStudent:', error);
        res.status(500).json({ message: error.message });
    }
};


const getAllStudent = async (req, res) => {
    try {
        const students = await studentService.getAllStudent();
        if (!students.length) {
            return res.status(404).json({ message: 'No student found' });
        }
        res.status(200).json(students);
    } catch (error) {
        console.error('Error in getAllStudent:', error);
        res.status(500).json({ message: error.message });
    }
}

const getStudentById = async (req, res) => {
    try {
        const student = await studentService.getStudentById(req.params.id);
        if (!student.length) {
            return res.status(404).json({ message: 'No student found' });
        }
        res.status(200).json(student);
    } catch (error) {
        console.error('Error in getStudentById:', error);
        res.status(500).json({ message: error.message });
    }
}

const deleteStudent = async (req, res) => {
    const studentId = req.params.id; // Make sure you're using the correct parameter name
    console.log("CONTROL_ID", studentId);
    try {
        const result = await studentService.deleteStudent(studentId);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Successfully deleted student' });
    } catch (error) {
        console.error('Error in deleteStudent:', error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createStudent,
    getAllStudent,
    getStudentById,
    deleteStudent
};
