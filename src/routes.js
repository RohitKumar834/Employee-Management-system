const express = require('express');
const router = express.Router();
const { createEmployee, login, getEmployees, editEmployee, deleteEmployee } = require('./controllers');
const authMiddleware = require('./middleware');
const { check } = require('express-validator');

router.post('/employee', createEmployee);
router.post('/login', login);
router.get('/employees', authMiddleware, getEmployees);
router.put('/employee/:id', authMiddleware, [
    check('email').optional().isEmail().withMessage('Enter a valid email address'),
    check('mobile').optional().isMobilePhone().withMessage('Enter a valid mobile number')
], editEmployee);
router.delete('/employee/:id', authMiddleware, deleteEmployee);

module.exports = router;
