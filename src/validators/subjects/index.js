const { PostSubjectSchema, DeleteSubjectSchema } = require('./schema');

const SubjectsValidator = {
  validatePostSubjectPayload: (payload) => {
    const validationResult = PostSubjectSchema.validate(payload);
    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
  },
  validateDeleteSubjectPayload: (payload) => {
    const validationResult = DeleteSubjectSchema.validate(payload);
    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
  },
};

module.exports = SubjectsValidator;
