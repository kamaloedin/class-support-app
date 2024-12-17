const express = require('express');
const router = express.Router();
const studentController = require('../controllers/students');
const authMiddleware = require('../middlewares/auth');
const { check } = require('express-validator');

router.get(
  '/add-student-form',
  authMiddleware.checkAuthenticated,
  studentController.getStudentFormHandler,
);

router.get(
  '/:studentId',
  authMiddleware.checkAuthenticated,
  studentController.getStudentDetailsHandler,
);

router.post(
  '/',
  authMiddleware.checkAuthenticated,
  [
    check('id', 'ID must contain at least 4 characters').isString().isLength({ min: 4 }),
    check('name', 'Name must be string and not empty').notEmpty().isString(),
    check('classId', 'Class must not be empty').notEmpty().isString(),
    check('birthDate', 'Birth Date must not be empty').notEmpty().isDate(),
    check('birthPlace', 'Birth Place must not be empty').notEmpty().isString(),
    check('religion', 'Religion must be string').isString(),
    check('address', 'Address must not be empty').notEmpty().isString(),
    check('postalCode', 'Postal Code must not be empty').notEmpty().isString(),
    check('phone', 'Invalid phone number').isMobilePhone('id-ID'),
    check('email', 'Invalid email').isEmail(),
    check('guardianName', 'Guardian name must not be empty').notEmpty().isString(),
    check('guardianOccupation', 'Guardian occupation must not be empty').notEmpty().isString(),
    check('fatherName', 'Invalid Father name value').isString(),
    check('fatherOccupation', 'Invalid Father occupation value').isString(),
    check('motherName', 'Invalid Mother name value').isString(),
    check('motherOccupation', 'Invalid Mother occupation value').isString(),
  ],
  studentController.postStudentHandler,
);

module.exports = router;
