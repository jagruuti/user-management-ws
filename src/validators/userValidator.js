const{body}= require('express-validator');
exports.createUserValidator = [
body('name')
.notEmpty()
.withMessage('Name is required'),

body('email')
.isEmail()
.withMessage('Email is required')
];
//
//if (!name || typeof name !== 'string' || name.trim() === '') {
//  return res.status(400).json({ message: 'Name is required' });
//}
//
//const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//if (!email || !emailRegex.test(email)) {
//  return res.status(400).json({ message: 'Invalid email' });
//}