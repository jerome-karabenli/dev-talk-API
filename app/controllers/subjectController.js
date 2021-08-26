const { Subject, User, Comment } = require("../models")
const {deleteUnthorizedKeys, deleteEmptyKeys} = require("../services/utils")

const validKeys = ["comments", "title", "description", "references"]

module.exports = {
    getAllOrFilter: async (req, res) => {
        
        try {
            let {author, title} = req.query
            
            if(!author && !title){
                
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
            
            if(!title) title = ""
            if(title) title = title.toLowerCase()+title.toUpperCase()
            
            const subjects = await Subject.find({$or: [{author}, {title: {$regex:`^[${title}]`}}]})
            .populate({path: "comments", model: 'Comment', select: '-subject', populate: 
                        {
                            path: 'author',
                            model: "User", 
                            select: 'pseudo lastname firstname'
                        }
                })
                
            if(!subjects.length) return res.status(404).json({message: "subject not found"})
            res.json(subjects)
   
        } catch (error) {
            res.status(500).json(error.message)
        }
    },

    getById: async (req, res) => {
        const {_id} = req.params
        try {

            const subject = await Subject.findOne({_id})
            .populate({path: "author", model: "User", select: 'pseudo lastname firstname'})
            if(!subject) return res.status(404).json({message: "subject not found"})

            res.json(subject)

        } catch (error) { 
            res.status(500).json(error)
        }
    },

    getByAuthor: async (req, res) => {
        const {author} = req.params

        try {
            
            const subjects = await Subject.find({author})
            .populate({path: "author", model: "User", select: 'pseudo lastname firstname'})
            if(!subjects) return res.status(404).json({message: "subject not found"})

            res.json(subjects)

        } catch (error) {
            res.status(500).json(error)
        }
        
    },

    addOne: async (req, res) => {
        try {
            const { author, title, description, date } = req.body
    
            const userExist = await User.exists({_id: author})
            if(!userExist) return res.status(404).json({message: "l'utilisateur n'existe pas"})

            const newSubject = new Subject(req.body)
            await newSubject.save()
            await User.updateOne({ _id: author }, { $push: { subjects: newSubject._id } })
            
            res.json(newSubject)
            
        } catch (error) {
            res.status(500).json(error)
        }
    },


    addReference: async (req, res) => {
        try {
            const { url, description } = req.body
            const {_id} = req.params

            const newReference = {url, description}

            const {nModified} = await Subject.updateOne({ _id }, { $push: { references: newReference } })

            if(!nModified) return res.status(404).json({message: "subject not found"})

            res.json({message: "reference added"})
            
        } catch (error) {
            res.status(500).json(error.message)
        }
    },


    updateOne: async (req, res) => {
        try {
            const {_id} = req.params
 
            const updatedSubject = await Subject.findOneAndUpdate({ _id }, req.body, {new: true})
            if(!updatedSubject) return res.status(404).json({message: "subject not found"})
            
            res.json(updatedSubject)
        
        } catch (error) {
            res.status(500).json(error)
        }
    },

    deleteOne: async (req, res) => {
        try {
            const { _id } = req.params
           
            const subject = await Subject.findOneAndDelete({ _id })
            if(!subject) return res.status(404).json({message: "subject not found"})

            const {nModified} = await User.updateOne({ _id: subject.author }, { $pull: { subjects: _id } })

            if(!nModified) return res.status(500).json({message: "author of subject not found"})

            res.json({message: "subject deleted"})
            

        } catch (error) {
            res.status(500).json(error.message)
        }
    },

    deleteReference: async (req, res) => {
        const {url} = req.body
        const {_id} = req.params

        
        await Subject.updateMany({_id}, {$pull: {references: {url}}})
       
        res.json({message: "reference deleted"})
    }
}