import Joi from "joi";

export const hotelCreateSchema = Joi.object({
  name: Joi.string().min(2).required(),
  city: Joi.string().min(2).required(),
  starRating: Joi.number().integer().min(1).max(5).default(3),
  address: Joi.string().min(3).required(),
  description: Joi.string().allow(""),
  manager: Joi.string().allow(""),
  amenities: Joi.array().items(Joi.string()).default([]),
});

export const hotelUpdateSchema = hotelCreateSchema.fork(
  ["name","city","address"], (s)=> s.optional()
);
