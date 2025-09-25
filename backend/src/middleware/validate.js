// src/middleware/validate.js
import Joi from "joi";

export function validate(schema, which = "body") {
  return (req, res, next) => {
    const data = req[which] || {};
    const { error, value } = schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
      convert: true,
    });
    if (error) {
      return res.status(400).json({
        ok: false,
        error: {
          message: "Validation error",
          code: "VALIDATION_ERROR",
          details: error.details.map(d => ({
            field: d.path.join("."),
            msg: d.message
          }))
        }
      });
    }
    req[which] = value;
    next();
  };
}
