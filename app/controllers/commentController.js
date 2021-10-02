const { Comment, User, Subject } = require("../models")

module.exports = {
    getByAuthor: async (req, res) => {
        try {

            const author = req.tokenPayload._id

            const comments = await Comment.find({author}, {author: 0})
            
            res.json(comments)
   
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    createComment: async (req, res) => {
        try {
            const { subject } = req.body
            const author = req.tokenPayload._id
            req.body.author = author

            const subjectExist = await Subject.exists({_id: subject})
            if(!subjectExist) throw new Error('subject not found')

            const newComment = await new Comment(req.body).save()

            const {nModified} = await Subject.updateOne({ _id: subject }, { $push: { comments: newComment._id } })

            if(!nModified) throw new Error('subject not found')

            res.status(201).json({message: 'comment created'})

        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    updateComment: async (req, res) => {
        try {
            const { body, _id } = req.body
            const author = req.tokenPayload._id
            
            const commentExist = await Comment.exists({_id, author})
            if(!commentExist) throw new Error('comment not found or comment not associated with this user')
           
            const {nModified} = await Comment.updateOne({_id}, {body})
            if(!nModified) throw new Error('comment not updated')

            res.json({message: 'comment updated'})
            
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    deleteComment: async (req, res) => {
        try {
            const { _id } = req.query
            const author = req.tokenPayload._id
            
            const comment = await Comment.findOneAndDelete({ _id, author }, {subject: 1, _id: 0})
            if(!comment?.subject) throw new Error('comment not found or not associated with this user')
            
            const {nModified} = await Subject.updateOne({ _id: comment.subject }, { $pull: { comments: _id } })
            if(!nModified) throw new Error('subject not updated')

            res.json({message: "comment deleted"})
        

        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}