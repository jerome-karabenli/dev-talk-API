const { Subject, User, Comment } = require("../models")

module.exports = {
    getAllOrFilter: async (req, res) => {
        try {
            
            if(!req.query.title){
                
                const subjects = await Subject.find({})
                .populate({path: "author", model: 'User', select: 'pseudo lastname firstname'})
                .populate({path: "comments", model: 'Comment', select: '-subject', populate: 
                        {
                            path: 'author',
                            model: "User", 
                            select: 'pseudo lastname firstname'
                        }
                })
                return res.json(subjects)
            }

            const {title} = req.query
            
            const subjects = await Subject.find({title: {$regex: title, $options: 'i'} })
            .populate({path: "author", model: 'User', select: 'pseudo lastname firstname'})
            .populate({path: "comments", model: 'Comment', select: '-subject', populate: 
                        {
                            path: 'author',
                            model: "User", 
                            select: 'pseudo lastname firstname'
                        }
                })
                
            if(!subjects.length) return res.status(404).json({message: `no subject title match with '${title}'`})
            res.json(subjects)
   
        } catch (error) {
            res.status(500).send({error: error.message})
        }
    },

    createSubject: async (req, res) => {
        try {
            const { _id } = req.tokenPayload

            req.body.author = _id

            const newSubject = await new Subject(req.body).save()

            await User.updateOne({ _id }, { $push: { subjects: newSubject._id } })
            
            res.status(201).json({message: 'subject created'})
            
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    updateSubject: async (req, res) => {
        try {
            const author = req.tokenPayload._id
            const {_id} = req.body

            
            if(!req.body.references){
                const {nModified} = await Subject.updateOne({ _id, author }, req.body) 
                if(!nModified) throw new Error('subject not found or subject not associated with this user')
            }

            const {nModified} = await Subject.updateOne({ _id, author }, {$push: {references: req.body.references}})
            if(!nModified) throw new Error('subject not found or subject not associated with this user')
           
            res.json({message: 'subject updated'})
        
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    },

    deleteSubject: async (req, res) => {
        try {
            const { _id } = req.query
            const author = req.tokenPayload._id
            
            const {deletedCount} = await Subject.deleteOne({ _id, author })
            if(!deletedCount) throw new Error('subject not found or subject not associated with this user')

            const {nModified} = await User.updateOne({ _id: author }, { $pull: { subjects: _id } })
            if(!nModified) throw new Error('subject not found or subject not associated with this user')

            res.json({message: "subject deleted"})
            
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}