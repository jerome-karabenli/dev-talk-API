const { User } = require("../models")


module.exports = {
    getAllUsers: async (req, res) => {
        const users = await User.find({}, {password:0})
        res.json(users)

    }, 
    getOneUser: async (req, res) => {
        const {_id, lastname, pseudo, email} = req.params

        const user = await User.findOne({$or: [{_id}, {lastname}, {pseudo}, {email}]}, {password:0})
        if(!user) return res.status(404).json({message: "user not found"})
        res.json(user)
    },

    getAllOrFilter: async (req, res) => {
        try {
            const { _id, pseudo, lastname } = req.params
            
            if(!_id && !pseudo && !lastname) {
                const users = await User.find({}, {password: 0})
                return res.json(users)    
            }
            const users = await User.find({$or: [{_id}, {pseudo}, {lastname}]}, {password:0})
            res.json(users)
            
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
}