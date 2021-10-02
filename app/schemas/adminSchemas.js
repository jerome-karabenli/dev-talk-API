const Joi = require("joi")

module.exports = {
    user: {
        filterUsers: Joi.object({
            pseudo: Joi.string(),
            lastname: Joi.string(),
            email: Joi.string().email()
        }),
        updateUserToAdmin: Joi.object({
            _id: Joi.string().alphanum().length(24).required()
        }),
        deleteUser: Joi.object({
            _id: Joi.string().alphanum().length(24).required()
        })
    },

    subject: {
        deleteSubject: Joi.object({
            _id: Joi.string().alphanum().length(24).required()
        })
    },

    comment: {
        deleteComment: Joi.object({
            _id: Joi.string().alphanum().length(24).required()
        })
    }
   
}