const Joi = require("joi")

module.exports = {
    
    createSubject: Joi.object({
        title: Joi.string().trim().required(),
        description: Joi.string().trim().required(),
        date: Joi.date().required()
    }),
    updateSubject: Joi.object({
        title: Joi.string().trim(),
        description: Joi.string().trim(),
        date: Joi.date().greater("now"),
        _id: Joi.string().alphanum().length(24).trim()

    }),

    filterSubject: Joi.object({
        title: Joi.string()
    }),

   


}