const { RegisterUserSchema } = require('./schema');

const RegisterValidator = {
  validateRegisterUserPayload: (payload) => {
    const validationResult = RegisterUserSchema.validate(payload);
    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
  },
};

module.exports = RegisterValidator;
