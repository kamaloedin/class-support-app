const subjectModel = require('../models/subjects');
const SubjectsValidator = require('../validators/subjects');

const getAllSubjectsHandler = async (req, res) => {
  const subjects = await subjectModel.getAllSubjects();
  res.render('subjects', {
    layout: 'layouts/main-layout',
    title: 'Subjects| Class Support App',
    subjects,
    msg: req.flash('msg'),
    roleId: req.user.role_id,
    errorMsg: req.flash('errorMsg'),
  });
};

const getAddSubjectFormHandler = async (req, res) => {
  const subject = {};
  res.render('add-subject-form', {
    layout: 'layouts/main-layout',
    title: 'Add Subject Form | Class Support App',
    subject,
    roleId: req.user.role_id,
    errorMsg: req.flash('errorMsg'),
  });
};

const postSubjectHandler = async (req, res) => {
  try {
    SubjectsValidator.validatePostSubjectPayload(req.body);
    await subjectModel.addSubject(req.body.name);
    req.flash('msg', 'Subject has been added');
    res.redirect('/subjects');
  } catch (error) {
    console.log(error);
    res.render('add-subject-form', {
      layout: 'layouts/main-layout',
      title: 'Add Subject Form | Class Support App',
      subject,
      roleId: req.user.role_id,
      errorMsg: error.message,
    });
  }
};

const deleteSubjectHandler = async (req, res) => {
  try {
    SubjectsValidator.validateDeleteSubjectPayload(req.body);
    await subjectModel.deleteSubject(req.body.id);
    req.flash('msg', 'Subject has been deleted');
    res.redirect('/subjects');
  } catch (error) {
    console.log(error);
    req.flash('errorMsg', error.message);
    res.redirect('/subjects');
  }
};

module.exports = {
  getAllSubjectsHandler,
  getAddSubjectFormHandler,
  postSubjectHandler,
  deleteSubjectHandler,
};
