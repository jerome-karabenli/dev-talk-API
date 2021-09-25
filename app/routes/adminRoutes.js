const adminRouter = require('express').Router()
const adminController = require("../controllers/adminController")


adminRouter.route("/admin/user")
.get( adminController.getAllOrFilter)
.patch( adminController.update)
.delete( adminController.delete)



module.exports = adminRouter