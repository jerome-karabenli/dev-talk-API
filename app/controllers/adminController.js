const { User, Subject, Comment } = require("../models")


module.exports = {
     
    user: {
        getAllOrFilter: async (req, res) => {
            try {
                const { pseudo, lastname, email } = req.query
                
                if( pseudo || lastname || email ) {
                    const filteredUsers = await User.find({$or: [{pseudo}, {lastname}, {email}]}, {password:0})
                    return res.json(filteredUsers)    
                }
                
                const users = await User.find({}, {password: 0})
                res.json(users)
                
            } catch (error) {
                res.status(500).send({error: error.message})
            }
        },
    
        makeAdmin: async (req, res) => {
            try {
                const {_id} = req.body
    
                const {nModified} = await User.updateOne({_id}, {$push: {role: "admin"}})
                if(!nModified) throw new Error('user not found')
    
                res.json({message: 'user updated'})
            } catch (error) {
                res.status(500).send({error: error.message})
            }
        },
    
        delete: async (req, res) => {
            try {
                const {_id} = req.body
    
                const user = await User.findOne({_id}, {role:1, _id:0})
                if(user?.role.includes('admin')) throw new Error('cannot delete admin user')

                const {deletedCount} = await User.deleteOne({_id})
                if(!deletedCount) throw new Error('user not found')
    
                res.json({message: 'user deleted'})
            } catch (error) {
                res.status(500).send({error: error.message})
                
            }
        }
    },

    subject: {
        delete: async (req, res) => {
            try {
                const {_id} = req.body

                const {deletedCount} = await Subject.deleteOne({_id})
                if(!deletedCount) throw new Error('subject not found')

                res.json({message: 'subject deleted'})
            } catch (error) {
                res.status(500).send({error: error.message})
                
            }
        }
    },

    comment: {
        delete: async (req, res) => {
            try {
                const {_id} = req.body

                const {deletedCount} = await Comment.deleteOne({_id})
                if(!deletedCount) throw new Error('comment not found')

                res.json({message: 'comment deleted'})
            } catch (error) {
                res.status(500).send({error: error.message})
                
            }
        }
    }

   
}