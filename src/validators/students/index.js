const { StudentDetailsSchema, StudentPhotoSchema } = require('./schema');

const StudentsValidator = {
  validateStudentDetailPayload: (payload) => {
    const validationResult = StudentDetailsSchema.validate(payload);
    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
  },

  validateStudentPhotoPayload: (payload) => {
    const validationResult = StudentPhotoSchema.validate(payload);
    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
  },
};

module.exports = StudentsValidator;
