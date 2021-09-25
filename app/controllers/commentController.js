const { Comment, User, Subject } = require("../models")

module.exports = {
    getByAuthor: async (req, res) => {
        try {

            const author = req.token._id

            const comments = await Comment.find({author})
            .populate({path: "author", model: "User", select: 'pseudo lastname firstname'})
            res.json(comments)
            
   
        } catch (error) {
            res.status(500).json(error)
        }
    },


    addOne: async (req, res) => {
        try {
            const { subject } = req.body
            const author = req.token._id
    
            const userExist = await User.exists({_id: author})
            if(!userExist) return res.status(404).json({message: "l'utilisateur n'existe pas"})

            
            const subjectExist = await Subject.exists({_id: subject})
            
            if(!subjectExist) return res.status(404).json({message: "le sujet n'existe pas"})

            const newComment = new Comment(req.body)

            newComment.author = author
            
            await newComment.save()

            const {nModified} = await Subject.updateOne({ _id: subject }, { $push: { comments: newComment._id } })

            if(!nModified) return res.status(404).json({message: "comment not found"})

            res.json(newComment)

        } catch (error) {
            res.statusCode(500).json(error)
        }
    },

    

    updateOne: async (req, res) => {
        try {
            const { body, _id } = req.body
            const author = req.token._id
            
            const commentExist = await Comment.exists({_id, author})
            if(!commentExist) return res.status(404).json({message: "comment not found"})
           
            const updatedComment = await Comment.findOneAndUpdate({_id}, {body}, {new: true})
            res.json(updatedComment)
            

        } catch (error) {
            if(error) res.status(500).json(error)
        }
    },

    deleteOne: async (req, res) => {
        try {
            const { _id } = req.query
            const author = req.token._id
            
            const comment = await Comment.findOneAndDelete({ _id, author })
            
            if(!comment) return res.status(404).json({message: "comment not found"})

            const {nModified} = await Subject.updateOne({ _id: comment.subject }, { $pull: { comments: _id } })
          
            if(!nModified) return res.status(404).json({message: "comment not found"})

            res.json({message: "comment deleted"})
        

        } catch (error) {
            res.status(500).json(error)
        }
    }
}