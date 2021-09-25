const jwt = require("jsonwebtoken")
const secret = process.env.ACCES_TOKEN_SECRET
const {promisify} = require('util');

const asyncJWT = {
    verify: promisify(jwt.verify).bind(jwt),
    sign: promisify(jwt.sign).bind(jwt)
}


module.exports = {
    verifyToken: async (req, res, next) => {
        
        try {
            const token = req.headers["authorization"].split(" ")[1];
            req.token = await asyncJWT.verify(token, secret)
            next()

        } catch (error) {
            console.log(error.message)
            return res.status(401).send('Unauthorized')  
        }
         
    },

    jwtSign: async (obj) => {
        
        try {
            return await asyncJWT.sign(
                obj, 
                secret, 
                { expiresIn: '30y', algorithm: 'HS256' }
            )
        } catch (error) {
            console.log(error.message)
            throw new Error(error.message)
        }

    },

    isAdmin: (req, res, next) => {
        const isAdmin = req.token.role.find(role => role === 'admin')
        if(!isAdmin) return res.status(403).send("Unauthorized")
        next()
    }
  
}
