const jwt = require("jsonwebtoken")

const secret = process.env.ACCES_TOKEN_SECRET
const {User} = require("../models");

module.exports = {
    verifyToken: async (req, res, next) => {
        try {
            const authHeader = req.headers["authorization"];

            if (!authHeader) return res.status(403).json("No token provided!");
           
            const token = authHeader.split(" ")[1]

            if(!token) return res.status(401).json("Unauthorized")
            
            jwt.verify(token, secret, (err, data) => {
                if(err) return res.status(401).json(err)
                else {
                    req.token = data
                    next()     
                }
            })
            
        } catch (error) {
            res.status(500).json(error)
  
        }
    },

    isAdmin: async (req, res, next) => {

        const tokenData = req.token
        
        const admin = tokenData.role.find(role => role === "admin")
        if(!admin) return res.status(403).json("Require Admin Role !")

        next()    
    }
}

