const { User, Subject, Comment } = require("../models")
const { deleteEmptyKeys, deleteUnthorizedKeys, checkEmail, checkPassword } = require("../services/utils")



module.exports = {
    // getAllOrFilter: async (req, res) => {
    //     try {
    //         const { _id, pseudo, lastname } = req.params
            
    //         if(!_id && !pseudo && !lastname) {
    //             const users = await User.find({}, {password: 0})
    //             return res.json(users)    
    //         }
    //         const users = await User.find({$or: [{_id}, {pseudo}, {lastname}]}, {password:0})
    //         res.json(users)
            
    //     } catch (error) {
    //         res.status(500).json(error.message)
    //     }
    // },

    getOne: async (req, res) => {
        try {
           
           
            const { _id } = req.token
            
            const user = await User.findOne({ _id }, {password:0})
            .populate(
            {
                path: "subjects",
                model: "Subject", 
                select: '-author', 
                populate: 
                {
                    path: "comments", 
                    model: "Comment", 
                    select: '-subject'
                }
            })
            
            if(!user) res.status(404).json({message: "user not found"})

            return res.json(user)

        } catch (error) {
            res.status(500).json(error)
            
        }

    },

    updateOne: async (req, res) => {
        try {
            
            const {_id} = req.token
            
            const updatedUser = await User.findOneAndUpdate({_id}, req.body, {new: true}).select("-password")
            .populate({
                path: "subjects",
                model: "Subject", 
                select: '-author', 
                populate: {
                    path: "comments", 
                    model: "Comment", 
                    select: '-subject'
                }
            })
            if(!updatedUser) return res.status(404).json({message: "user not found"})

            res.json(updatedUser)
        
        } catch (error) {
            res.status(500).json(error)
        }
    },

    deleteOne: async (req, res) => {
        try {
            const { _id } = req.token

            const {deletedCount} = await User.deleteOne({ _id })
            if(!deletedCount) return res.status(404).json({message: "user not found"})
            res.json({message: "user deleted"})
            
        } catch (error) {
            res.status(500).json(error)
        }
    }
}