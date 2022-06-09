const Joi = require("joi");
const ErrorResponse = require("../utils/ErrorResponse");

exports.validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return next(new ErrorResponse("validation error"));
  }

  next();
};

exports.registrationSchema = Joi.object()
  .keys({
    name: Joi.string().min(1).required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    company: Joi.string().required(),
    languages: Joi.object().keys({
      javascript: Joi.array(),
      python: Joi.array(),
      java: Joi.array(),
    }),
    price: Joi.number().min(5000).max(100000).required(),
    location: Joi.object().keys({
      longitude: Joi.string(),
      latitude: Joi.string(),
    }),
  })
  .unknown();
