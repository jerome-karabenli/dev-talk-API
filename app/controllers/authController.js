const { User } = require('../models')
const bcrypt = require("bcryptjs")
const {jwtSign} = require('../services/authJwt')


module.exports = {
    login: async (req, res, next) => {
        try {

            const { pseudo, password } = req.body
            
            const user = await User.findOne({pseudo})
            
            if(!user) return res.status(404).json({message: "Erreur d'authenfication"})
            
            const compare = await bcrypt.compare(password, user.password)
            if(!compare) return res.status(404).json({message: "Erreur d'authenfication"})
            
            const token = await jwtSign({_id: user._id, role: user.role})
            
            res.json({accesToken: token})
            
            
        } catch (error) {
            res.status(500).json(error.message)
        }
    }, 

    register: async (req, res) => {
        try {
         
            const {pseudo, lastname, email } = req.body

            const userExist = await User.exists({$or: [{ email }, { lastname }, { pseudo }]})
            if(userExist) return res.status(401).json({message:"vous etes déja enregistré"})

            const newUser = new User(req.body)
            await newUser.save()
            const token = jwtSign({_id: user._id, role: user.role})
            res.json({accesToken: token})
            
           
        } catch (error) {
            res.status(500).json(error)
        }
        

    },

    // lostPassword: async (req, res) => {
    //     try {
    //         const {pseudo, lastname, firstname, email, password, passwordConfirm} = req.body
    //         const userExist = await User.exists({pseudo, lastname, firstname, email})
            
    //         if(!userExist) return res.status(404).json({message: "Utilisateur non trouvé"})
    //         if(!password === passwordConfirm) return res.status(400).json({message: "les mots de passe ne correspondent pas"})
    //         console.log(req.body)
    //         const salt = await bcrypt.genSalt(10)
    //         const hashedPass = await bcrypt.hash(password, salt)
    //         const user = await User.findOneAndUpdate({pseudo, lastname, firstname, email}, {password: hashedPass})
            
    //         if(!user) throw Error("Une erreur s'est produite merci de réessayer plus tard")

    //         const token = jwt.sign({ _id: user._id, role: user.role }, 
    //             jwtSecret, { expiresIn: '1h' }
    //         )
    //         res.json({accesToken: token})
            
    //     } catch (error) {
    //         res.status(500).json(error.message)
    //     }
    // },

    // changePassword: async (req, res) => {
    //     const {oldPassword, newPassword} = req.body
    //     const {_id} = req.token

    //     if(oldPassword === newPassword) return res.status(400).json({message:'merci de renseigner un mot de passe différent'})
        
    //     const user = await User.findOne({_id})
     
    //     const compare = await bcrypt.compare(oldPassword, user.password)
    //     if(!compare) res.status(400).json({message: "Le mot de passe ne correspond pas"})
    //     if(compare) {
            
    //         user.password = newPassword
    //         await user.save()

    //         res.json(user)
    //     }

    // }
}