const Joi = require('joi');

const validator = (schema,payload) =>
    schema.validate(payload, { abortEarly: false, allowUnknown: true });


module.exports = validator;






