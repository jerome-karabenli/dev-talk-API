const authRouter = require('express').Router()
const {authController} = require('../controllers')


authRouter.post("/login", authController.login)
authRouter.post("/register", authController.register)


module.exports = authRouter