import Joi from "joi";

export const rangeQuery = Joi.object({
  start: Joi.date().iso().required(),
  end: Joi.date().iso().required(),
  format: Joi.string().valid("csv","pdf").optional()
});

export const topRoomsQuery = Joi.object({
  start: Joi.date().iso().required(),
  end: Joi.date().iso().required(),
  limit: Joi.number().integer().min(1).max(50).default(5)
});
