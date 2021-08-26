const { Comment, User, Subject } = require("../models")

module.exports = {
    getAllOrFilter: async (req, res) => {
        try {

            const { subject, author } = req.params

            if(!subject && !author){
                const comments = await Comment.find({})
                .populate({path: "author", model: "User", select: 'pseudo lastname firstname'})
                return res.json(comments)
            }

            const comments = await Comment.find({$or: [{subject}, {author}]})
            .populate({path: "author", model: "User", select: 'pseudo lastname firstname'})
            res.json(comments)
            
   
        } catch (error) {
            res.status(500).json(error)
        }
    },

    getOne: async (req, res) => {
       
            const {_id} = req.params

            try {

                const comment = await Comment.findOne({_id})
                .populate({path: "author", model: "User", select: 'pseudo lastname firstname'})
                if(!comment) return res.status(404).json({message: "comment not found"})

                res.json(comment)

            } catch (error) { 
                res.status(500).json(error.message)
            }
    },




    addOne: async (req, res) => {
        try {
            const { author, subject, body } = req.body
    
            const userExist = await User.exists({_id: author})
            if(!userExist) return res.status(404).json({message: "l'utilisateur n'existe pas"})

            const subjectExist = await Subject.exists({_id: subject})
            if(!subjectExist) return res.status(404).json({message: "le sujet n'existe pas"})

            const newComment = new Comment(req.body)
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
            const { body } = req.body
            const {_id} = req.params
            
            const commentExist = await Comment.exists({_id})
            if(!commentExist) return res.status(404).json({message: "comment not found"})
           
            const updatedComment = await Comment.findOneAndUpdate({_id}, {body}, {new: true})
            res.json(updatedComment)
            

        } catch (error) {
            if(error) res.status(500).json(error)
        }
    },

    deleteOne: async (req, res) => {
        try {
            const { _id } = req.params

            const comment = await Comment.findOneAndDelete({ _id })
            if(!comment) return res.status(404).json({message: "comment not found"})

            const {nModified} = await Subject.updateOne({ _id: comment.subject }, { $pull: { comments: _id } })
            console.log(nModified)
            if(!nModified) return res.status(404).json({message: "comment not found"})

            res.json({message: "comment deleted"})
        

        } catch (error) {
            res.status(500).json(error)
        }
    }
}