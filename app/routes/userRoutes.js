const userRouter = require('express').Router()
const userController = require("../controllers/userController")
const passwordUpdateCheck = require('../middlewares/passwordUpdateCheck')


userRouter.route("/user")
.get(  userController.getLogged)
.patch( passwordUpdateCheck, userController.updateUser)
.delete(  userController.deleteUser)



module.exports = userRouter