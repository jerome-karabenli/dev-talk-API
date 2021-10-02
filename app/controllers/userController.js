const { User, Subject, Comment } = require("../models")
const bcrypt = require("bcryptjs")



module.exports = {

    getLogged: async (req, res) => {
        try {
            const { _id } = req.tokenPayload
            
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

            res.json(user)

        } catch (error) {
            res.status(500).json(error.message)  
        }

    },

    updateUser: async (req, res) => {
        try {
            
            const {_id} = req.tokenPayload

            const {nModified} = await User.updateOne({_id}, req.body)
            if(!nModified) throw new Error('user not updated')
            
            res.json({message: 'user updated'})

        
        } catch (error) {
            res.status(500).send({error: error.message})
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { _id } = req.tokenPayload

            const {deletedCount} = await User.deleteOne({ _id })
            if(!deletedCount) throw new Error('user not deleted')
            
            res.json({message: "user deleted"})
            
        } catch (error) {
            res.status(500).send({error: error.message})
        }
    }
}