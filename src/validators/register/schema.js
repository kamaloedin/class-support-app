const Joi = require('joi');

const RegisterUserSchema = Joi.object({
  empId: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case 'any.required':
            err.message = 'Employee ID must not be empty';
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  username: Joi.string()
    .min(6)
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case 'string.min':
            err.message = 'Username must have at least 6 characters';
            break;
          case 'any.required':
            err.message = 'Username must not be empty';
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  password: Joi.string()
    .min(6)
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case 'string.min':
            err.message = 'Password must have at least 6 characters';
            break;
          case 'any.required':
            err.message = 'Password must not be empty';
            break;
          default:
            break;
        }
      });
      return errors;
    }),
});

module.exports = { RegisterUserSchema };
