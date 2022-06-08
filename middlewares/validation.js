const Joi = require("joi");
const ErrorResponse = require("../utils/ErrorResponse");

exports.validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    console.log("Joi error: ", error);
    return next(new ErrorResponse("validation error"));
  }

  next();
};

exports.registrationSchema = Joi.object().keys({
  name: Joi.string().min(6).required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  company: Joi.string().required(),
  language: Joi.array().length(1).required(),
  price: Joi.number().min(5000).max(100000).required(),
  location: Joi.object().keys({ coordinates: Joi.array().length(2) }),
});
