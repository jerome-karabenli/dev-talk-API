const { User } = require('../models')
const bcrypt = require("bcryptjs")
const {signAccessToken, signRefreshToken, signResetPasswordToken} = require('../services/authJwt')
const asyncRedisClient = require('../utils/redis_promisify')
const sendEmail = require('../services/nodemailer')
const resetPasswordTemplate = require('../utils/email-templates/resetPassword')

const TIMEOUT = 60 * 60 * 24; // 24 heures

module.exports = {
    login: async (req, res, next) => {
        try {

            const { pseudo, password } = req.body
            
            const user = await User.findOne({pseudo})
            if(!user) return res.status(404).send({error: "Auth error"})
            
            const compare = await bcrypt.compare(password, user.password)
            if(!compare) return res.status(404).send({error: "Auth error"})
            
            const accessToken = await signAccessToken({_id: user._id, role: user.role})
            const refreshToken = await signRefreshToken({_id: user._id, role: user.role})

            await asyncRedisClient.setex('refreshTokenUser' + user._id, TIMEOUT, refreshToken)
            res.json({accessToken, refreshToken})
                
        } catch (error) {
            
            res.status(500).send({error: error.message})
        }
    }, 

    register: async (req, res) => {
        try {
         
            const {pseudo, lastname, email } = req.body

            const userExist = await User.exists({$or: [{ email }, { lastname }, { pseudo }]})
            if(userExist) return res.status(401).json({error:"already registered"})

            delete req.body.passwordConfirm

            const newUser = await new User(req.body).save()
            if(!newUser._id) throw new Error("user not created")
            
            res.status(201).json({message: "user created"})
           
        } catch (error) {
            res.status(500).json({error: error.message})
        }
        

    },

    refreshToken: async (req, res) => {
        
        try {
            const refreshToken = req.headers["authorization"].split(" ")[1]
            const cachedRefreshToken = await asyncRedisClient.get("refreshTokenUser" + req.tokenPayload._id)
            if(refreshToken !== cachedRefreshToken) return res.status(401).send("Unauthorized")

            const newAccessToken = await signAccessToken({_id: req.tokenPayload._id, role: req.tokenPayload.role})
            const newRefreshToken = await signRefreshToken({_id: req.tokenPayload._id, role: req.tokenPayload.role})

            await asyncRedisClient.setex('refreshTokenUser' + req.tokenPayload._id, TIMEOUT, newRefreshToken)
            res.json({accessToken: newAccessToken, refreshToken: newRefreshToken})

        } catch (error) {
            res.status(500).send({error: error.message})
        }

    },

    resetPassword: async (req, res) => {
        try {
            const {email} = req.body
            const user = await User.findOne({email})
            if(!user) res.status(404).send({error: 'user not found'})

            const resetToken = await signResetPasswordToken({_id: user._id})

            await asyncRedisClient.setex('resetToken' + user._id, 60*60, resetToken)

            const emailBody = resetPasswordTemplate(resetToken)

            await sendEmail("jdevtalk@gmail.com", "Reset Password", emailBody)

            res.json({message: 'email sent'})

        } catch (error) {
            res.status(500).send({error: error.message})
        }
    },

    confirmResetPassword: async (req, res) => {
        try {
            delete req.body.passwordConfirm
            const {_id} = req.tokenPayload

            const deleteToken = await asyncRedisClient.del('resetToken' + _id)
            if(!deleteToken) return res.status(401).send({error: 'token is already used'})

            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)

            const {nModified} = await User.updateOne({_id}, req.body)
            if(!nModified) throw new Error('user password not updated')
            
            res.json({message: 'user password updated'})

        } catch (error) {
            res.status(500).send({error: error.message})
        }
    }
    

    
}