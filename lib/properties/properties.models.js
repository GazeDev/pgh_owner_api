const Joi = require('@hapi/joi');

module.exports = {
  apiFilterQuery: Joi.object().keys({
    parcelId: [
      Joi.array().items(Joi.string()),
      Joi.string()
    ],
    address: [
      Joi.array().items(Joi.string()),
      Joi.string()
    ],
    owner: [
      Joi.array().items(Joi.string()),
      Joi.string()
    ],
    ownerAddress: [
      Joi.array().items(Joi.string()),
      Joi.string()
    ],
  }),
};
