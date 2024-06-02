const Joi = require("joi") 

const bannerCreateSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    subTitle: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(3).max(500).required(),
    url: Joi.string().uri().required(),
    status:Joi.string().regex(/^(active|inactive)$/).default('inactive')
})

module.exports = {bannerCreateSchema}