const Joi = require("joi")

module.exports = {
    add: Joi.object({
        body: Joi.string().trim().required(),
        author: Joi.string().alphanum().length(24).required(),
        subject: Joi.string().alphanum().length(24).required()
    }),
    update: Joi.object({
        body: Joi.string().trim().required()
    }),
    delete: Joi.object({
        _id: Joi.string().alphanum().length(24).required()
    })

}