const router = require('express').Router()
const {adminController, authController, userController, subjectController, commentController} = require("./controllers")
const { verifyToken, isAdmin, isUser } = require('./services/authJwt')
const {validateBody, validateParams, validateQuery} = require("./services/schemaValidator")
const {userSchema, commentSchema, subjectSchema, authSchema} = require("./schemas")
const {cache, flush} = require('./services/cache')

// user
router.route("/user")
.get(verifyToken, cache, userController.getOne)
.patch(verifyToken, validateBody(userSchema.update), flush, userController.updateOne)
.put(verifyToken, validateBody(userSchema.changePassword), flush, authController.changePassword) //todo refacto
.delete(verifyToken, flush, userController.deleteOne)
    
// subject
router.route("/subject")
.get(verifyToken, validateQuery(subjectSchema.get), cache, subjectController.getAllOrFilter)
.post(verifyToken, validateBody(subjectSchema.add), flush, subjectController.addOne)
.patch(verifyToken, validateBody(subjectSchema.update), flush, subjectController.updateOne)
.delete(verifyToken, flush, subjectController.deleteOne)


// subject references //todo refacto references
router.route("/subject/:_id/reference")
.post(verifyToken, validateBody(subjectSchema.addReference), flush, subjectController.addReference)
.delete(verifyToken, flush, subjectController.deleteReference)


// comment
router.route("/comment/:author")
.get(verifyToken, cache, commentController.getByAuthor)
.post(verifyToken, validateBody(commentSchema.add), flush, commentController.addOne)
.patch(verifyToken, validateBody(commentSchema.update), flush, commentController.updateOne)
.delete(verifyToken, validateParams(commentSchema.delete), flush, commentController.deleteOne)

    
// auth
router.post("/login", validateBody(authSchema.login), authController.login)
router.post("/register", validateBody(authSchema.register), authController.register)
router.post("/recovery", validateBody(authSchema.lostPassword), authController.lostPassword)

// admin
router.route("/admin/user")
.get(verifyToken, isAdmin, cache, adminController.getAllOrFilter)
.patch(verifyToken, isAdmin, flush, adminController.update)
.delete(verifyToken, isAdmin, flush, adminController.delete)

module.exports = router