const authRouter = require('express').Router()
const {authController} = require('../controllers')
const {verifyRefreshToken, verifyResetPasswordToken} = require('../services/authJwt')


authRouter.post("/login", authController.login)
authRouter.post("/register", authController.register)
authRouter.get("/refresh_token", verifyRefreshToken, authController.refreshToken)
authRouter.post("/reset_password", authController.resetPassword)
authRouter.post("/confirm_reset_password", verifyResetPasswordToken, authController.confirmResetPassword)


module.exports = authRouter