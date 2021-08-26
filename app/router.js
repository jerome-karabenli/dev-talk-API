const router = require('express').Router()
const {adminController, authController, userController, subjectController, commentController} = require("./controllers")
const { verifyToken, isAdmin, isUser } = require('./services/authJwt')
const {validateBody, validateParams, validateQuery} = require("./services/schemaValidator")
const {userSchema, commentSchema, subjectSchema, loginSchema} = require("./schemas")


// user
router.route("/user")
.get(verifyToken, isUser, userController.getOne)
.patch(verifyToken, isUser, validateBody(userSchema.update) , userController.updateOne)
.delete(verifyToken, isUser ,userController.deleteOne)
    
// subject
router.route("/subject")
.get(verifyToken, isUser, validateQuery(subjectSchema.get), subjectController.getAllOrFilter)
.post(verifyToken, isUser, validateBody(subjectSchema.add) , subjectController.addOne)

router.route("/subject/:_id")
.get(verifyToken, isUser, subjectController.getById)
.patch(verifyToken, isUser, validateBody(subjectSchema.update), subjectController.updateOne)
.delete(verifyToken, isUser, subjectController.deleteOne)

// subject references
router.route("/subject/:_id/reference")
.post(verifyToken, isUser, validateBody(subjectSchema.addReference), subjectController.addReference)
.delete(verifyToken, isUser, subjectController.deleteReference)


    
// comment
router.route("/comment")
.get(verifyToken, isUser, commentController.getAllOrFilter)
.post(verifyToken, isUser, validateBody(commentSchema.add), commentController.addOne)

router.route("/comment/:_id")
.get(verifyToken, isUser, commentController.getOne)
.patch(verifyToken, isUser, validateBody(commentSchema.update), commentController.updateOne)
.delete(verifyToken, isUser,validateParams(commentSchema.delete), commentController.deleteOne)

    
// auth
router.post("/login", validateBody(loginSchema.login), authController.login)
router.post("/register", validateBody(userSchema.add), authController.register)

// admin
router.get("/admin/users", verifyToken, isAdmin, adminController.getAllOrFilter)
router.get("/admin/user", verifyToken, isAdmin, adminController.getOneUser)


module.exports = router