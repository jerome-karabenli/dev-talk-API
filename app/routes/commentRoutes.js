const commentRouter = require('express').Router()
const commentController = require("../controllers/commentController")


commentRouter.route("/comment")
.get( commentController.getByAuthor)
.post( commentController.addOne)
.patch( commentController.updateOne)
.delete( commentController.deleteOne)

module.exports = commentRouter