const userRouter = require('express').Router()
const userController = require("../controllers/userController")


userRouter.route("/user")
.get(  userController.getOne)
.patch(  userController.updateOne)
.delete(  userController.deleteOne)



module.exports = userRouter