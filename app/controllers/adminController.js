const { User } = require("../models")


module.exports = {
     
    getAllOrFilter: async (req, res) => {
        try {
            const { _id, pseudo, lastname, email } = req.query
            
            if(_id || pseudo || lastname || email) {
                const filteredUsers = await User.find({$or: [{_id}, {pseudo}, {lastname}, {email}]}, {password:0})
                return res.json(filteredUsers)    
            }
            
            const users = await User.find({}, {password: 0})
            res.json(users)
            
        } catch (error) {
            res.status(500).send(error)
        }
    },

    update: async (req, res) => {
        try {
            const _id = req.params
            const updatedUser = await User.findOneAndUpdate({_id}, req.body, {new:true})
            res.json(updatedUser)
        } catch (error) {
            res.status(500).json(error.message)
        }
    },

    delete: async (req, res) => {
        try {
            const _id = req.query

            const {deletedCount} = await User.deleteOne({_id})
            if(!deletedCount) return res.status(404).json({message: "user not found"})
            res.json({message: "user deleted"})
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}