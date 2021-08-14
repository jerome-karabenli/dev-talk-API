const { Comment, User, Subject } = require("../models")
const { deleteEmptyKeys, deleteUnthorizedKeys } = require("../utils")



module.exports = {
    getAllOrFilter: async (req, res) => {
        try {

            const { _id, author, subject } = req.body

            if( _id || author || subject ) {
                const comments = await Comment.find({$or:[{_id}, {author}, {subject}]}, {__v:0})
                .populate({path: "author", model: "User", select: 'pseudo lastname firstname'})
                return res.json(comments)
            } else{
                console.log("coucou")
                const comments = await Comment.find({}, {__v:0})
                .populate({path: "author", model: "User", select: 'pseudo lastname firstname'})
                return res.json(comments)
            }
   
        } catch (error) {
            res.statusCode(500).json(error)
        }
    },

    addOne: async (req, res) => {
        try {
            const { author, subject, body } = req.body
    

            if(deleteEmptyKeys(req.body)) return res.status(404).json("il manque un champ")

            const userExist = await User.exists({_id: author})
            if(!userExist) return res.status(404).json("l'utilisateur n'existe pas")

            const subjectExist = await Subject.exists({_id: subject})
            if(!subjectExist) return res.status(404).json("le sujet n'existe pas")

            const newComment = new Comment(req.body)
            await newComment.save()
            await Subject.updateOne({ _id: subject }, { $push: { comments: newComment._id } })
            res.json(newComment)

        } catch (error) {
            res.statusCode(500).json(error)
        }
    },

    getOne: async (req, res) => {
        try {
            const { _id, author, subject } = req.body

            
            res.json(comment)
        } catch (error) {
            res.statusCode(500).json(error)
        }

    },

    updateOne: async (req, res) => {
        try {
            const { body, _id } = req.body
            const validKeys = ["body", "_id"]

            if(deleteEmptyKeys(req.body)) throw new Error("il manque un champ")
            deleteUnthorizedKeys(req.body, validKeys)
            

            const commentExist = await Comment.exists({_id})
            if(commentExist){
            const updatedComment = await Comment.updateOne({_id}, req.body, {new: true})
            res.json(updatedComment)
            }

        } catch (error) {
            if(error) res.statusCode(500).json(error)
        }
    },

    deleteOne: async (req, res) => {
        try {
            const { _id } = req.body

            const commentExist = await Comment.exists({_id})

            if(commentExist) {
            await Comment.deleteOne({_id})
            res.json(true)
            }
            else res.statusCode(404).json("le commentaire n'existe pas")

        } catch (error) {
            if(error) res.statusCode(500).json(error)
        }
    }
}