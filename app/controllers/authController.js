const { User } = require('../models')
const bcrypt = require("bcryptjs")
const { deleteEmptyKeys, deleteUnthorizedKeys, checkEmail, checkPassword } = require("../services/utils")
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.ACCES_TOKEN_SECRET


module.exports = {
    login: async (req, res, next) => {
        try {
           
            const { pseudo, password } = req.body
            
            const user = await User.findOne({pseudo})
            if(!user) return res.status(404).json({message: "Erreur d'authenfication"})
            
            const compare = await bcrypt.compare(password, user.password)
            if(!compare) return res.status(404).json({message: "Erreur d'authenfication"})
  
            const token = jwt.sign(
                { _id: user._id, role: user.role },
                 jwtSecret, {expiresIn: '1h'}
            );
            res.json({accesToken: token})
            
            
        } catch (error) {
            res.status(500).json(error)
        }
    }, 

    register: async (req, res) => {
        try {
        
            const {pseudo, firstname, lastname, email ,password, passwordConfirm} = req.body

            if(!checkEmail(email)) return res.status(401).json("email invalide")
            if(password !== passwordConfirm) return res.status(401).json("les mots de passe ne correspondent pas")
            if(!checkPassword(password)) return res.status(401).json("le mot de passe doit comporter au minimum 1 minuscule 1 majuscule 1 chiffre 1 caractere special : +")

            const userExist = await User.exists({$or: [{ email }, { lastname }, { pseudo }]})
            if(userExist) return res.status(401).json({message:"vous etes déja enregistré"})

            const newUser = new User(req.body)
            await newUser.save()
            const token = jwt.sign({ _id: newUser._id, role: newUser.role }, 
                jwtSecret, { expiresIn: '1h' }
            )
            res.json({accesToken: token})
            
           
        } catch (error) {
            res.status(500).json(error)
        }
        

    }
}