const studentModel = require('../models/students');
const classModel = require('../models/classes');
const { validationResult } = require('express-validator');
const { studentDetailsSchema } = require('../validators/students/schema');
const StudentsValidator = require('../validators/students');

const getStudentsHandler = async (req, res) => {
  const students = await studentModel.getAllStudents();

  res.render('students', {
    layout: 'layouts/main-layout',
    title: 'Students List | Class Support App',
    students,
    roleId: req.user.role_id,
  });
};

const getStudentDetailsHandler = async (req, res) => {
  const { studentId } = req.params;
  const student = await studentModel.getStudentDetails(studentId);
  student.birth_date = student.birth_date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  student.register_date = student.register_date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  res.render('student-details', {
    layout: 'layouts/main-layout',
    title: `${student.name} | Student Details`,
    student,
    roleId: req.user.role_id,
    msg: req.flash('msg'),
  });
};

const getAddStudentFormHandler = async (req, res) => {
  const classes = await classModel.getAllClasses();
  const student = {};
  const currentDate = new Date().toLocaleDateString('en-ZA').replace(/\//g, '-');
  res.render('add-student-form', {
    layout: 'layouts/main-layout',
    title: 'Add Student Form | Class Support App',
    classes,
    student,
    currentDate,
    errorMsg: req.flash('errorMsg'),
  });
};

const postStudentHandler = async (req, res) => {
  const classes = await classModel.getAllClasses();
  const currentDate = new Date().toLocaleDateString('en-ZA').replace(/\//g, '-');
  try {
    StudentsValidator.validateStudentDetailPayload(req.body);
    StudentsValidator.validateStudentPhotoPayload(req.file);
    const expressValidationErrors = validationResult(req);
    if (!expressValidationErrors.isEmpty()) {
      res.render('add-student-form', {
        layout: 'layouts/main-layout',
        title: 'Add Student Form | Class Support App',
        classes,
        student: req.body,
        currentDate,
        errorMsg: req.flash('errorMsg'),
        expressValidationErrors: expressValidationErrors.array(),
      });
    } else {
      if (req.file) {
        req.body.img_file = req.file.filename;
      }
      await studentModel.addStudent(req.body);
      req.flash('msg', 'Student has been added');
      res.redirect(`/classes/${req.body.class_id}`);
    }
  } catch (error) {
    console.log(error);
    req.flash('errorMsg', error.message);
    res.render('add-student-form', {
      layout: 'layouts/main-layout',
      title: 'Add Student Form | Class Support App',
      classes,
      student: req.body,
      currentDate,
      errorMsg: error.message,
    });
  }
};

const getEditStudentFormHandler = async (req, res) => {
  const classes = await classModel.getAllClasses();
  const student = await studentModel.getStudentDetails(req.params.studentId);
  const currentDate = new Date().toLocaleDateString('en-ZA').replace(/\//g, '-');
  student.birth_date = student.birth_date.toLocaleDateString('en-ZA').replace(/\//g, '-');
  res.render('edit-student-form', {
    layout: 'layouts/main-layout',
    title: 'Edit Student Form | Class Support App',
    classes,
    student,
    currentDate,
    errorMsg: req.flash('errorMsg'),
  });
};

const putStudentHandler = async (req, res) => {
  const classes = await classModel.getAllClasses();
  const currentDate = new Date().toLocaleDateString('en-ZA').replace(/\//g, '-');
  try {
    const expressValidationErrors = validationResult(req);
    StudentsValidator.validateStudentDetailPayload(req.body);
    StudentsValidator.validateStudentPhotoPayload(req.file);
    const student = await studentModel.getStudentDetails(req.body.id);
    if (!expressValidationErrors.isEmpty()) {
      res.render('edit-student-form', {
        layout: 'layouts/main-layout',
        title: 'Edit Student Form | Class Support App',
        classes,
        student: req.body,
        currentDate,
        errorMsg: req.flash('errorMsg'),
        expressValidationErrors: expressValidationErrors.array(),
      });
    } else {
      if (req.file) {
        req.body.img_file = req.file.filename;
      } else {
        req.body.img_file = student.img_file;
      }
      await studentModel.updateStudent(req.body);
      req.flash('msg', 'Student data has been edited');
      res.redirect(`/students/${req.body.id}`);
    }
  } catch (error) {
    console.log(error);
    req.flash('errorMsg', error.message);
    res.render('edit-student-form', {
      layout: 'layouts/main-layout',
      title: 'Edit Student Form | Class Support App',
      classes,
      student: req.body,
      currentDate,
      errorMsg: error.message,
    });
  }
};

const deleteStudentHandler = async (req, res) => {
  StudentsValidator.validateStudentIdPayload(req.body);
  await studentModel.verifyStudentId(req.body.id);
  await studentModel.expelStudent(req.body.id);
  req.flash('msg', 'Student has been expelled');
  res.redirect(`/students/${req.body.id}`);
};

module.exports = {
  getStudentDetailsHandler,
  getAddStudentFormHandler,
  postStudentHandler,
  getStudentsHandler,
  getEditStudentFormHandler,
  putStudentHandler,
  deleteStudentHandler,
};
