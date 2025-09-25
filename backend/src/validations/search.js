import Joi from "joi";

export const searchAvailabilityQuery = Joi.object({
  city: Joi.string().optional(),
 checkIn: Joi.string().isoDate().optional(),
checkOut: Joi.string().isoDate().optional(),

  guests: Joi.number().integer().min(1).optional(),
  maxPrice: Joi.number().min(0).optional(),
  type: Joi.string().optional()
});
