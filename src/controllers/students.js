const studentModel = require('../models/students');
const classModel = require('../models/classes');

const getStudentDetailsHandler = async (req, res) => {
  const { studentId } = req.params;
  const student = await studentModel.getStudentDetails(studentId);
  const classId = student.class_id;
  const className = await classModel.getClassName(classId);
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
    className,
  });
};

const getStudentFormHandler = async (req, res) => {
  const classes = await classModel.getAllClasses();
  res.render('add-student-form', {
    layout: 'layouts/main-layout',
    title: 'Add Student Form | Class Support App',
    classes,
  });
};

const postStudentHandler = async (req, res) => {
  try {
    await studentModel.addStudent(req.body);
    res.redirect(`/classes/${req.body.classId}`);
  } catch (error) {
    console.log(error);
    res.redirect('students/add-student-form');
  }
};

module.exports = { getStudentDetailsHandler, getStudentFormHandler, postStudentHandler };
