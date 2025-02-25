const { StudentDetailsSchema, StudentPhotoSchema, StudentIdSchema } = require('./schema');

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

  validateStudentIdPayload: (payload) => {
    const validationResult = StudentIdSchema.validate(payload);
    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
  },
};

module.exports = StudentsValidator;
