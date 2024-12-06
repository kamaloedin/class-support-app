const studentModel = require('../models/students');
const classModel = require('../models/classes');
const dateFormat = require('../utils/dateFormat');

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

module.exports = { getStudentDetailsHandler };
