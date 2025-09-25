import Joi from "joi";

export const couponCreateSchema = Joi.object({
  code: Joi.string().uppercase().alphanum().min(3).max(32).required(),
  discountType: Joi.string().valid("PERCENT","FIXED").required(),
  amount: Joi.number().min(0).required(),
  validFrom: Joi.date().iso().optional(),
  validTo: Joi.date().iso().optional(),
  minNights: Joi.number().integer().min(0).default(0),
  maxUses: Joi.number().integer().min(0).default(0)
});

export const couponUpdateSchema = couponCreateSchema.fork(
  ["code","discountType","amount"], (s)=> s.optional()
);
