const Joi = require("joi")

module.exports = {
    login: Joi.object({
        pseudo: Joi.string().trim().required(),
        password: Joi.string().trim().required().regex(new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.\-_*])([a-zA-Z0-9@#$%^&+=*.\-_]){8,}$'))
    }),

    lostPassword: Joi.object({
        pseudo: Joi.string().trim().max(40).required(),
        lastname: Joi.string().trim().max(40).required(),
        firstname: Joi.string().trim().max(40).required(),
        email: Joi.string().email().trim().max(40).required(),
        password: Joi.string().trim().regex(new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]){8,}$')).required(),
        passwordConfirm: Joi.string().trim().required().valid(Joi.ref('password'))
    }),

    register: Joi.object({
        pseudo: Joi.string().trim().max(40).required(),
        lastname: Joi.string().trim().max(40).required(),
        firstname: Joi.string().trim().max(40).required(),
        email: Joi.string().email().trim().max(40).required(),
        password: Joi.string().trim().regex(new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]){8,}$')).required(),
        passwordConfirm: Joi.string().trim().required().valid(Joi.ref('password'))
    })
   
}