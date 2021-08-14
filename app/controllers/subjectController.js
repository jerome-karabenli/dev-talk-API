const { Subject, User, Comment } = require("../models")
const {deleteUnthorizedKeys, deleteEmptyKeys} = require("../utils")

const validKeys = ["comments", "title", "description", "references"]

module.exports = {
    getAllOrFilter: async (req, res) => {
        try {
            const { _id, author, title } = req.body
            if(_id || author || title) {
                const subjects = await Subject.find({$or: [{_id}, {author}, {title}]}, {__v:0})
                .populate({path: "author", model: 'User', select: 'pseudo lastname firstname'})
                return res.json(subjects)
            } else {
                const subjects = await Subject.find({}, {__v:0})
                .populate({path: "author", model: 'User', select: 'pseudo lastname firstname'})
                return res.json(subjects)
            }
            
        } catch (error) {
            res.status(500).json(error)
        }
    },

    addOne: async (req, res) => {
        try {
            const { author, title, description, date } = req.body
            if(deleteEmptyKeys(req.body)) return res.status(404).json("Merci de renseigner tous les champs")
            if(!author || !title || !description || !date) return res.status(404).json("Merci de renseigner tous les champs")
    
            const userExist = await User.exists({_id: author})
            if(!userExist) return res.status(404).json("l'utilisateur n'existe pas")

            const newSubject = new Subject(req.body)
            await newSubject.save()
            await User.updateOne({ _id: author }, { $push: { subjects: newSubject._id } })
            res.json(newSubject)
            
        } catch (error) {
            res.status(500).json(error.message)
        }
    },


    addReference: async (req, res) => {
        try {
            const { _id, reference, description } = req.body

            if(deleteEmptyKeys(req.body)) return res.status(404).json("Merci de renseigner tous les champs")
            if(!_id || !reference) return res.status(404).json("Merci de renseigner tous les champs")
    
            const subjectExist = await Subject.exists({_id})
            if(!subjectExist) return res.status(404).json("le sujet n'existe pas")

            const newReference = {reference, description}
            const validation = await Subject.updateOne({ _id }, { $push: { references: newReference } })
            res.json(validation.nModified)
            
        } catch (error) {
            res.status(500).json(error.message)
        }
    },


    updateOne: async (req, res) => {
        try {
            const { _id, description, title } = req.body
 
            deleteEmptyKeys(req.body)

            if(!description && !title) return res.status(404).json("Merci de compléter au moins un champs")

            const subjectExist = await Subject.exists({ _id })
            if(!subjectExist) return res.status(404).json(false)
            else{
            const updatedSubject = await Subject.findOneAndUpdate({ _id }, req.body, {new: true})
            res.status(200).json(updatedSubject)
        }
        } catch (error) {
            res.status(500).json(error.message)
        }
    },

    deleteOne: async (req, res) => {
        try {
            const { _id } = req.body

            const subjectExist = await Subject.exists({_id})
            if(!subjectExist) return res.status(404).json(false)
            else {
            const validation = await Subject.deleteOne({ _id })
            res.json(validation.deletedCount)
            }

        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}