const Joi = require("joi")

module.exports = {
    login: Joi.object({
        pseudo: Joi.string().trim().required(),
        password: Joi.string().trim().required().regex(new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]){8,}$')),
    }),


    register: Joi.object({
        pseudo: Joi.string().trim().max(40).required(),
        lastname: Joi.string().trim().max(40).required(),
        firstname: Joi.string().trim().max(40).required(),
        email: Joi.string().email().trim().max(40).required(),
        password: Joi.string().trim().required().regex(new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]){8,}$')),
        passwordConfirm: Joi.string().trim().required().valid(Joi.ref('password'))
    }),

    reset_password: Joi.object({
        email: Joi.string().email().required()
    }),

    confirm_reset_password: Joi.object({
        password: Joi.string().trim().required().regex(new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]){8,}$')),
        passwordConfirm: Joi.string().trim().required().valid(Joi.ref('password'))
    })
   
}