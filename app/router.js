const router = require('express').Router()
const userController = require("./controllers/userController")
const subjectController = require("./controllers/subjectController")
const commentController = require("./controllers/commentController")
const authController = require("./controllers/authController")

// user
router.route("/user")
.get(userController.getAllOrFilter)
.patch(userController.updateOne)
.delete(userController.deleteOne)
    


// subject
router.route("/subject")
.get(subjectController.getAllOrFilter)
.patch(subjectController.updateOne)
.put(subjectController.addReference)
.post(subjectController.addOne)
.delete(subjectController.deleteOne)
    

// comment
router.route("/comment")
.get(commentController.getAllOrFilter)
.patch(commentController.updateOne)
.post(commentController.addOne)
.delete(commentController.deleteOne)
    


// auth
router.post("/login", authController.login)
router.post("/register", authController.register)

module.exports = router