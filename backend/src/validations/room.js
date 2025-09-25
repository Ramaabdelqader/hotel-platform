import Joi from "joi";

export const roomCreateSchema = Joi.object({
  hotelId: Joi.number().integer().required(),
  type: Joi.string().required(),
  capacity: Joi.number().integer().min(1).required(),
  basePrice: Joi.number().min(0).required(),
  size: Joi.number().integer().min(0).optional()
});

export const seasonalPriceSchema = Joi.object({
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().required(),
  price: Joi.number().min(0).required()
});
