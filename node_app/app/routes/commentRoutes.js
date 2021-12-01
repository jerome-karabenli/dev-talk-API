const commentRouter = require('express').Router()
const commentController = require("../controllers/commentController")


commentRouter.route("/comment")
.get( commentController.getByAuthor)
.post( commentController.createComment)
.patch( commentController.updateComment)
.delete( commentController.deleteComment)

module.exports = commentRouter