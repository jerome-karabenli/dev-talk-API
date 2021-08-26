const Joi = require("joi")

module.exports = {
    login: Joi.object({
        pseudo: Joi.string().trim().required(),
        password: Joi.string().trim().required().regex(new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.\-_*])([a-zA-Z0-9@#$%^&+=*.\-_]){8,}$'))
    })
}