const { Subject, User, Comment } = require("../models")

module.exports = {
    getAllOrFilter: async (req, res) => {
        
        try {
            
            
            let {title} = req.query
            
            
            
            if(!title){
                
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
            
            
           
            
            
            
            const subjects = await Subject.find({$or: [{title: {$regex:`${title}`, $options: 'i'} }]})
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


    addOne: async (req, res) => {
        try {
            const { _id } = req.token
         
    
            const userExist = await User.exists({ _id })
            
            if(!userExist) return res.status(404).json({message: "l'utilisateur n'existe pas"})

            const newSubject = new Subject(req.body)

            newSubject.author = _id
           
            await newSubject.save()

            await User.updateOne({ _id }, { $push: { subjects: newSubject._id } })
            
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
            const author = req.token._id
            const {_id} = req.body
           
            
            const updatedSubject = await Subject.findOneAndUpdate({ _id, author }, req.body, {new: true})
           
            if(!updatedSubject) return res.status(404).json({message: "subject not found"})
            
            res.json(updatedSubject)
        
        } catch (error) {
            res.status(500).json(error)
        }
    },

    deleteOne: async (req, res) => {
        try {
            const { _id } = req.query
            const author = req.token._id
            
            const subject = await Subject.findOneAndDelete({ _id, author })
            if(!subject) return res.status(404).json({message: "subject not found"})

            const {nModified} = await User.updateOne({ _id: author }, { $pull: { subjects: _id } })

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