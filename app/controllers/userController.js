const { User, Subject, Comment } = require("../models")



module.exports = {
    
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

            res.json(user)

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