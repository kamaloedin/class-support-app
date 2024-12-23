const studentModel = require('../models/students');
const classModel = require('../models/classes');
const { validationResult } = require('express-validator');

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
    title: 'Student Details | Class Support App',
    student,
    roleId: req.user.role_id,
    msg: req.flash('msg'),
  });
};

const getAddStudentFormHandler = async (req, res) => {
  const classes = await classModel.getAllClasses();
  const student = {};
  res.render('add-student-form', {
    layout: 'layouts/main-layout',
    title: 'Add Student Form | Class Support App',
    classes,
    student,
  });
};

const postStudentHandler = async (req, res) => {
  const classes = await classModel.getAllClasses();
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    try {
      await studentModel.addStudent(req.body);
      req.flash('msg', 'Student has been added');
      res.redirect(`/classes/${req.body.class_id}`);
    } catch (e) {
      console.log(e);
      res.render('add-student-form', {
        layout: 'layouts/main-layout',
        title: 'Add Student Form | Class Support App',
        classes,
        student: req.body,
      });
    }
  } else {
    res.render('add-student-form', {
      layout: 'layouts/main-layout',
      title: 'Add Student Form | Class Support App',
      classes,
      student: req.body,
      validationErrors: validationErrors.array(),
    });
  }
};

const getEditStudentFormHandler = async (req, res) => {
  const classes = await classModel.getAllClasses();
  const student = await studentModel.getStudentDetails(req.params.studentId);
  student.birth_date = student.birth_date.toLocaleDateString('en-ZA').replace(/\//g, '-');
  res.render('edit-student-form', {
    layout: 'layouts/main-layout',
    title: 'Edit Student Form | Class Support App',
    classes,
    student,
  });
};

const putStudentHandler = async (req, res) => {
  const classes = await classModel.getAllClasses();
  const validationErrors = validationResult(req);
  const student = await studentModel.getStudentDetails(req.body.id);
  if (validationErrors.isEmpty()) {
    try {
      await studentModel.updateStudent(req.body);
      req.flash('msg', 'Student data has been edited');
      res.redirect(`/students/${req.body.id}`);
    } catch (e) {
      console.log(e);
      res.render('edit-student-form', {
        layout: 'layouts/main-layout',
        title: 'Edit Student Form | Class Support App',
        classes,
        student: req.body,
      });
    }
  } else {
    res.render('edit-student-form', {
      layout: 'layouts/main-layout',
      title: 'Edit Student Form | Class Support App',
      classes,
      student,
      validationErrors: validationErrors.array(),
    });
  }
};

module.exports = {
  getStudentDetailsHandler,
  getAddStudentFormHandler,
  postStudentHandler,
  getStudentsHandler,
  getEditStudentFormHandler,
  putStudentHandler,
};
