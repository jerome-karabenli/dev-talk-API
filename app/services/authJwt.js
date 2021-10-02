const jwt = require("jsonwebtoken")
const {promisify} = require('util');

const asyncJWT = {
    verify: promisify(jwt.verify).bind(jwt),
    sign: promisify(jwt.sign).bind(jwt),
    decode: promisify(jwt.decode).bind(jwt)
}


module.exports = {
    verifyAccessToken: async (req, res, next) => {
        
        try {
            const token = req.headers["authorization"] && req.headers["authorization"].split(" ")[1]
            if(!token) throw new Error("no token provided")
            req.tokenPayload = await asyncJWT.verify(token, process.env.ACCESS_TOKEN_SECRET)
            next()

        } catch (error) {
            console.log(error.message)
            return res.status(401).send('Unauthorized')  
        }
         
    },

    verifyRefreshToken: async (req, res, next) => {
        
        try {
            const token = req.headers["authorization"] && req.headers["authorization"].split(" ")[1]
            if(!token) throw new Error("no token provided")
            req.tokenPayload = await asyncJWT.verify(token, process.env.REFRESH_TOKEN_SECRET)
            next()

        } catch (error) {
            console.log(error.message)
            res.status(401).send('Unauthorized')  
        }
         
    },

    verifyResetPasswordToken: async (req, res, next) => {
        
        try {
            const token = req.headers["authorization"] && req.headers["authorization"].split(" ")[1]
            if(!token) throw new Error("no token provided")
            req.tokenPayload = await asyncJWT.verify(token, process.env.RESET_PASSWORD_TOKEN_SECRET)
            next()

        } catch (error) {
            console.log(error.message)
            res.status(401).send('Unauthorized')  
        }
         
    },

    decryptAccesToken: (token) => {
        return new Promise(async (resolve, reject) => {
            if(!token) return resolve()
            token = token.split(" ")[1]
            if(!token) return resolve()
   
            try {
                const tokenData = await asyncJWT.verify(token, process.env.ACCESS_TOKEN_SECRET)
                return resolve(tokenData)
            } catch (error) {
                return reject(error)
            }
        })
      
        
    },

    

    signAccessToken: async (obj) => {
        try {
            return await asyncJWT.sign(
                obj, 
                process.env.ACCESS_TOKEN_SECRET, 
                { expiresIn: '20d', algorithm: 'HS256' }
            )
        } catch (error) {
            console.log(error.message)
            throw new Error(error.message)
        }
    },

    signRefreshToken: async (obj) => {
        try {
            return await asyncJWT.sign(
                obj, 
                process.env.REFRESH_TOKEN_SECRET, 
                { expiresIn: '20d', algorithm: 'HS256' }
            )
        } catch (error) {
            console.log(error.message)
            throw new Error(error.message)
        }
    },

    signResetPasswordToken: async (obj) => {
        try {
            return await asyncJWT.sign(
                obj, 
                process.env.RESET_PASSWORD_TOKEN_SECRET, 
                { expiresIn: '1h', algorithm: 'HS256' }
            )
        } catch (error) {
            console.log(error.message)
            throw new Error(error.message)
        }
    },

    isAdmin: (req, res, next) => {
        const isAdmin = req.tokenPayload.role.includes("admin")
        if(!isAdmin) return res.status(403).send({error:'Unauthorized'})
        next()
    },

    
  
}
