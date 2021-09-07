const Joi = require('joi');

module.exports = {
    
    update: Joi.object({
        pseudo: Joi.string().trim().max(40),
        lastname: Joi.string().max(40).trim(),
        firstname: Joi.string().max(40).trim(),
        email: Joi.string().email().max(40).trim().lowercase(),
        picture: Joi.string()
    }),

    changePassword: Joi.object({
        oldPassword: Joi.string().trim().regex(new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]){8,}$')).required(),
        newPassword: Joi.string().trim().regex(new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]){8,}$')).required(),
        newPasswordConfirm: Joi.string().trim().required().valid(Joi.ref('newPassword'))
    })
}

