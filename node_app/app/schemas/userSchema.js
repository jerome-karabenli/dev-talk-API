const Joi = require('joi');

module.exports = {
    
    
    updateUser: Joi.object({
        pseudo: Joi.string().trim().max(40),
        lastname: Joi.string().max(40).trim(),
        firstname: Joi.string().max(40).trim(),
        email: Joi.string().email().max(40).trim().lowercase(),
        picture: Joi.string().uri(),
        newPassword: Joi.string().trim().regex(new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]){8,}$')),
        newPasswordConfirm: Joi.string().trim().valid(Joi.ref('newPassword')),
        oldPassword: Joi.string().trim().regex(new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]){8,}$'))
    }).and("newPassword", "newPasswordConfirm", "oldPassword"),

    deleteUser: Joi.object({
        _id: Joi.string().alphanum().length(24).required()
    })




}

