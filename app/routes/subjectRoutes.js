const subjectRouter = require('express').Router()
const subjectController = require("../controllers/subjectController")



subjectRouter.route("/subject")
.get(  subjectController.getAllOrFilter)
.post( subjectController.addOne)
.patch( subjectController.updateOne)
.delete( subjectController.deleteOne)

// subject references //todo refacto references
// router.route("/subject/:_id/reference")
// .post( validateBody(subjectSchema.addReference), flush, subjectController.addReference)
// .delete( flush, subjectController.deleteReference)

module.exports = subjectRouter