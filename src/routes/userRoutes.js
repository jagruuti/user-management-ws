const express = require('express');
const { validationResult } = require('express-validator');

const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');

const { createUserValidator } = require('../validators/userValidator');

const router = express.Router();

// Central validation handler
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  console.log('VALIDATION ERRORS:', errors.array());

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Routes
router.post('/', createUserValidator, validateRequest, createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;


//const express= require('express');
//const { createUser } = require('../controllers/userController');
//const { createUserValidator } = require('../validators/userValidator');
//const { validationResult } = require('express-validator');
////const { body } = require('express-validator');
////const controller= require('../controllers/userController');
//const router= express.Router();
////
//////Helper middleware for validation
////const validateRequest =(req, res, next) => {
////const errors = validationResult(req);
////    if (!errors.isEmpty()){
////        return res.status(400).json({
////        errors: errors.array()
////        });
////    }
////    next();
//// };
//
////router.post(
////'/',
////[
////body('name').notEmpty().withMessage('Name is required'),
////body('email').isEmail().withMessage('Valid email is required'),
////],
////controller.createUser
////);
////
////router.get('/', controller.getAllUsers);
////router.get('/:id', controller.getUserById);
////router.put(
////'/:id',
////body('email').optional().isEmail().withMessage('Invalid email format'),
////controller.updateUser
////);
////
////router.delete('/:id', controller.deleteUser);
//
//router.post(
//  '/',
//  createUserValidator,
//  (req, res, next) => {
//    const errors = validationResult(req);
//    if (!errors.isEmpty()) {
//      return res.status(400).json({ errors: errors.array() });
//    }
//    next();
//  },
//  createUser
//);
//
//
//module.exports = router;
//
