const gradeModel = require('../models/grades');
const classModel = require('../models/classes');
const studentModel = require('../models/students');

const getAllClassesHandler = async (req, res) => {
  const grades = await gradeModel.getAllGrades();
  const classes = await classModel.getAllClasses();

  res.render('classes', {
    layout: 'layouts/main-layout',
    title: 'Classes | Class Support App',
    grades,
    classes,
  });
};

const getClassDetailsHandler = async (req, res) => {
  const { classId } = req.params;
  const students = await studentModel.getAllClassStudents(classId);
  const className = await classModel.getClassName(classId);

  res.render('class-details', {
    layout: 'layouts/main-layout',
    title: `${className} | Class Support App`,
    students,
    className,
    msg: req.flash('msg'),
  });
};

module.exports = { getAllClassesHandler, getClassDetailsHandler };
