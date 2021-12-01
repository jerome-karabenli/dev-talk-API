const Joi = require("joi")

module.exports = {
    createComment: Joi.object({
        body: Joi.string().trim().required(),
        subject: Joi.string().alphanum().length(24).required()
    }),
    updateComment: Joi.object({
        body: Joi.string().trim().required(),
        _id: Joi.string().alphanum().length(24).required()

    }),
    deleteComment: Joi.object({
        _id: Joi.string().alphanum().length(24).required()
    })

}