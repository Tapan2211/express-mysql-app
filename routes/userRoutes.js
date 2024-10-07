const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validateUser = require('../validations/userValidation');

router.post('/users', validateUser, userController.createUser);
router.get('/users/:id', userController.getUser);
router.get('/users', userController.getAllUsers);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;