const Joi = require('joi');

const PostSubjectSchema = Joi.object({
  name: Joi.string().required(),
});

const DeleteSubjectSchema = Joi.object({
  id: Joi.string().required(),
});

module.exports = { PostSubjectSchema, DeleteSubjectSchema };
