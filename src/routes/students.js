const express = require('express');
const router = express.Router();
const studentController = require('../controllers/students');
const authMiddleware = require('../middlewares/auth');
const multer = require('multer');
const { check } = require('express-validator');
const multerStorage = require('../middlewares/multer');

const upload = multer({ storage: multerStorage.studentPhotos });

router.get('/', authMiddleware.checkAuthenticated, studentController.getStudentsHandler);

router.get(
  '/add-student-form',
  authMiddleware.checkAuthenticated,
  studentController.getAddStudentFormHandler,
);

router.post(
  '/',
  upload.single('img_file'),
  authMiddleware.checkAuthenticated,
  [
    check('id', 'ID must contain at least 4 characters').isString().isLength({ min: 4 }),
    check('name', 'Name must be string and not empty').notEmpty().isString(),
    check('class_id', 'Class must not be empty').notEmpty().isString().isAlphanumeric(),
    check('birth_date', 'Birth Date must not be empty').notEmpty().isDate(),
    check('birth_place', 'Birth Place must not be empty').notEmpty().isString(),
    check('religion', 'Religion must be string').isString(),
    check('address', 'Address must not be empty').notEmpty().isString(),
    check('postal_code', 'Postal Code must not be empty').notEmpty().isString(),
    check('phone', 'Invalid phone number').isMobilePhone('id-ID'),
    check('email', 'Invalid email').isEmail(),
    check('guardian_name', 'Guardian name must not be empty').notEmpty().isString(),
    check('guardian_occupation', 'Guardian occupation must not be empty').notEmpty().isString(),
    check('father_name', 'Invalid Father name value').isString(),
    check('father_occupation', 'Invalid Father occupation value').isString(),
    check('mother_name', 'Invalid Mother name value').isString(),
    check('mother_occupation', 'Invalid Mother occupation value').isString(),
  ],
  studentController.postStudentHandler,
);

router.get(
  '/edit-student-form/:studentId',
  authMiddleware.checkAuthenticated,
  studentController.getEditStudentFormHandler,
);

router.put(
  '/',
  upload.single('img_file'),
  authMiddleware.checkAuthenticated,
  [
    check('id', 'ID must contain at least 4 characters').trim().isString().isLength({ min: 4 }),
    check('name', 'Name must be string and not empty').notEmpty().isString(),
    check('class_id', 'Class must not be empty').notEmpty().isString().isAlphanumeric(),
    check('birth_date', 'Birth Date must not be empty').notEmpty().isDate(),
    check('birth_place', 'Birth Place must not be empty').notEmpty().isString(),
    check('religion', 'Religion must be string').isString(),
    check('address', 'Address must not be empty').notEmpty().isString(),
    check('postal_code', 'Postal Code must not be empty').notEmpty().isString(),
    check('phone', 'Invalid phone number').isMobilePhone('id-ID'),
    check('email', 'Invalid email').isEmail(),
    check('guardian_name', 'Guardian name must not be empty').notEmpty().isString(),
    check('guardian_occupation', 'Guardian occupation must not be empty').notEmpty().isString(),
    check('father_name', 'Invalid Father name value').isString(),
    check('father_occupation', 'Invalid Father occupation value').isString(),
    check('mother_name', 'Invalid Mother name value').isString(),
    check('mother_occupation', 'Invalid Mother occupation value').isString(),
  ],
  studentController.putStudentHandler,
);

router.get(
  '/:studentId',
  authMiddleware.checkAuthenticated,
  studentController.getStudentDetailsHandler,
);

module.exports = router;
