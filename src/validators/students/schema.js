const Joi = require('joi');
const currentDate = new Date();
const StudentDetailsSchema = Joi.object({
  id: Joi.string()
    .alphanum()
    .min(4)
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case 'string.alphanum':
            err.message = 'ID must be alphanumerical';
            break;
          case 'string.min':
            err.message = 'ID must have at least 4 characters';
            break;
          case 'any.required':
            err.message = 'ID must not be empty';
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  name: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case 'any.required':
            err.message = 'Name must not be empty';
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  class_id: Joi.string()
    .alphanum()
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case 'any.required':
            err.message = 'Class must not be empty';
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  birth_date: Joi.date()
    .max(currentDate)
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case 'date.max':
            err.message = 'Date must not be later than the current date';
            break;
          case 'any.required':
            err.message = 'Date must not be empty';
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  birth_place: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case 'any.required':
            err.message = 'Birth place must not be empty';
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  religion: Joi.string().allow(''),
  address: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case 'any.required':
            err.message = 'Address must not be empty';
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  postal_code: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case 'any.required':
            err.message = 'Postal Code must not be empty';
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  phone: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case 'any.required':
            err.message = 'Phone must not be empty';
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  email: Joi.string()
    .email()
    .allow('')
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case 'string.email':
            err.message = 'Invalid email';
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  guardian_name: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case 'any.required':
            err.message = 'Guardian Name must not be empty';
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  guardian_occupation: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case 'any.required':
            err.message = 'Guardian Occupation must not be empty';
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  father_name: Joi.string().allow(''),
  father_occupation: Joi.string().allow(''),
  mother_name: Joi.string().allow(''),
  mother_occupation: Joi.string().allow(''),
  status: Joi.string()
    .valid('Active', 'Inactive', 'Expelled')
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case 'any.only':
            err.message = 'Invalid status value';
            break;
          default:
            break;
        }
      });
      return errors;
    }),
});

const StudentPhotoSchema = Joi.object({
  mimetype: Joi.string()
    .valid('image/jpeg', 'image/png', 'image/webp')
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case 'any.only':
            err.message = 'Photo must be one of these types: jpeg, png, webp';
            break;
          default:
            break;
        }
      });
      return errors;
    }),
}).unknown();

const StudentIdSchema = Joi.object({
  id: Joi.string()
    .alphanum()
    .min(4)
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case 'string.alphanum':
            err.message = 'ID must be alphanumerical';
            break;
          case 'string.min':
            err.message = 'ID must have at least 4 characters';
            break;
          case 'any.required':
            err.message = 'ID must not be empty';
            break;
          default:
            break;
        }
      });
      return errors;
    }),
});

module.exports = { StudentDetailsSchema, StudentPhotoSchema, StudentIdSchema };
