import Joi from "joi";

export const bookingCreateSchema = Joi.object({
  roomId: Joi.number().integer().required(),
  checkIn: Joi.date().iso().required(),
  checkOut: Joi.date().iso().required(),
  guests: Joi.number().integer().min(1).required(),
  couponCode: Joi.string().uppercase().alphanum().min(3).max(32).optional()
});

export const bookingListQuery = Joi.object({
  status: Joi.string().valid("PENDING","CONFIRMED","CANCELLED","EXPIRED").optional(),
  userId: Joi.number().integer().optional(),
  hotelId: Joi.number().integer().optional(),
  from: Joi.date().iso().optional(),
  to: Joi.date().iso().optional(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20)
});
