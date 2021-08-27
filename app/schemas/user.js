const Joi = require('joi');

module.exports = {
    add: Joi.object({
        pseudo: Joi.string().trim().max(40).required(),
        lastname: Joi.string().trim().max(40).required(),
        firstname: Joi.string().trim().max(40).required(),
        email: Joi.string().email().trim().max(40).required(),
        password: Joi.string().trim().regex(new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.\-_*])([a-zA-Z0-9@#$%^&+=*.\-_]){8,}$')).required(),
        passwordConfirm: Joi.string().trim().required().valid(Joi.ref('password'))
    }),

    update: Joi.object({
        pseudo: Joi.string().trim().max(40),
        lastname: Joi.string().max(40).trim(),
        firstname: Joi.string().max(40).trim(),
        email: Joi.string().email().max(40).trim().lowercase(),
        picture: Joi.string()
    })
}

