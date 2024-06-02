const Joi = require("joi");

const brandCreateSchema = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  tagline: Joi.string().empty(null, "").optional(),
  status: Joi.string()
    .regex(/^(active|inactive)$/)
    .default("inactive"),
});

module.exports = { brandCreateSchema };
