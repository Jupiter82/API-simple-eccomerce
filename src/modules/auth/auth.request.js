const Joi = require("joi");
//params is aways in object
//validation request
const registerSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    address: Joi.string().empty(),
    phone: Joi.string().pattern(/^(\+\d{1,3}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/),
    role: Joi.string().pattern(/^(superadmin|admin)$/)
})

const activatioToken = Joi.object({
    token: Joi.string().length(100).required()
})

//password and confirm password must match
//password must be between 8-25 characters

const passwordSchema = Joi.object({
    password: Joi.string().min(8).max(25).required(),
    confirmPassword: Joi.ref('password')
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password:Joi.string().required()
})
const forgetPassword = Joi.object({
    email: Joi.string().email().required()
})

module.exports = {
    registerSchema,
    activatioToken,
    passwordSchema,
    loginSchema,
    forgetPassword
}