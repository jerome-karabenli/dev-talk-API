const { User, Subject, Comment } = require("../models")
const { deleteEmptyKeys, deleteUnthorizedKeys, checkEmail, checkPassword } = require("../utils")



module.exports = {
    getAllOrFilter: async (req, res) => {
        try {
            const { _id, pseudo, lastname } = req.body
            
            if(_id || pseudo || lastname) {
                const users = await User.find({$or: [{_id}, {pseudo}, {lastname}]}, {password:0, __v:0})
                return res.json(users)
            }else {
                const users = await User.find({}, {password: 0, __v:0})
                return res.json(users)
            }
            
        } catch (error) {
            res.status(500).json(error.message)
        }
    },

    getOne: async (req, res) => {
        try {
            
            deleteEmptyKeys(req.body)
            const {_id, lastname, firstname, pseudo} = req.body
    
            const user = await User.findOne({$or: [{ _id } , { lastname }, { firstname }, { pseudo }]}, {password:0})
            
            if(user) res.json(user)
            else res.status(404).json(false)
        } catch (error) {
            res.status(500).json(error)
            
        }

    },

    updateOne: async (req, res) => {
        try {
            const { _id, pseudo, lastname, firstname, email, password } = req.body
            deleteEmptyKeys(req.body)
            if(email) {
                if(!checkEmail(email)) return res.status(404).json("Email invalide")
            }
            const userExist = await User.exists({_id})
            if(!userExist) return res.status(404).json(false)

            else {
            const updatedUser = await User.findOneAndUpdate({_id}, req.body, {new: true}).select("-password")
            res.json(updatedUser)
        }
        } catch (error) {
            res.statusCode(404).json(error)
        }
    },

    deleteOne: async (req, res) => {
        try {
            const { _id } = req.body

            const userExist = await User.exists({ _id })
            if(!userExist) return res.status(404).json(false)

            else {
            const validation = await User.deleteOne({ _id })
            res.json(validation.deletedCount)
            }

        } catch (error) {
            res.statusCode(500).json(error)
        }
    }
}