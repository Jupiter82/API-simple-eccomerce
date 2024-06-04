const Joi = require("joi");

const categoryCreateSchema = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  subCategory: Joi.string().empty(null, "").optional(),
  status: Joi.string()
    .regex(/^(active|inactive)$/)
    .default("inactive"),
});

module.exports = { categoryCreateSchema };
