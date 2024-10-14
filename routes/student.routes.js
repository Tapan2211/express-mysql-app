const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');
const studentValidation = require('../validations/student.validation');

router.post('/student', studentValidation, studentController.createStudent);
router.get('/student', studentController.getAllStudent);
router.get('/student/:id', studentController.getStudentById);
router.delete('/student/:id', studentController.deleteStudent);

module.exports = router;