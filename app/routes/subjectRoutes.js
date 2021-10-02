const subjectRouter = require('express').Router()
const subjectController = require("../controllers/subjectController")



subjectRouter.route("/subject")
.get(  subjectController.getAllOrFilter)
.post( subjectController.createSubject)
.patch( subjectController.updateSubject)
.delete( subjectController.deleteSubject)


module.exports = subjectRouter