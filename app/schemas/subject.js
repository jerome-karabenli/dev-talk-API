const Joi = require("joi")

module.exports = {
    get: Joi.object({
        author: Joi.string().alphanum().length(24).trim(),
        title: Joi.string().alphanum().trim()
    }),
    add: Joi.object({
        title: Joi.string().trim().required(),
        description: Joi.string().trim().required(),
        date: Joi.date().required(),
        author: Joi.string().alphanum().length(24)
    }),
    update: Joi.object({
        title: Joi.string().trim(),
        description: Joi.string().trim(),
        date: Joi.date().greater("now")
    }),

    addReference: Joi.object({
        url: Joi.string().trim().domain().required(),
        description: Joi.string().trim().required()
    }),

    deleteReference: Joi.object({

    })

}