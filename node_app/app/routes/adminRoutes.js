const adminRouter = require('express').Router()
const adminController = require("../controllers/adminController")
const {userController} = require('../controllers')


adminRouter.route("/admin/user")
.get( adminController.user.getAllOrFilter)
.patch(adminController.user.makeAdmin)
.delete(adminController.user.delete)

adminRouter.route('/admin/subject')
.delete(adminController.subject.delete)

adminRouter.route('/admin/comment')
.delete(adminController.comment.delete)

module.exports = adminRouter