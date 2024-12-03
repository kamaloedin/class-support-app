const gradeModel = require('../models/grades');
const classModel = require('../models/classes');

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

module.exports = { getAllClassesHandler };
