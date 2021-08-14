const { User } = require('../models')
const bcrypt = require("bcryptjs")
const { deleteEmptyKeys, deleteUnthorizedKeys, checkEmail, checkPassword } = require("../utils")
const mongoose = require("mongoose")


module.exports = {
    login: async (req, res, next) => {
        try {

            const { pseudo, password } = req.body
            if(deleteEmptyKeys(req.body)) return res.status(404).json("merci de completer tous les champs")
            if(!checkPassword(password)) return res.status(404).json("Erreur d'autentification")

            const userExist = await User.exists({pseudo})
            if(!userExist) return res.status(404).json("Erreur d'authentification")
            else {
            const user = await User.findOne({pseudo})
            const compare = await bcrypt.compare(password, user.password)
            if(!compare) return res.status(404).json("Erreur d'authenfication")
            else res.json(true) 
        }
        } catch (error) {
            res.status(500).json(error.message)
        }
    }, 

    register: async (req, res) => {
        try {
        
            const {pseudo, firstname, lastname, email ,password, passwordConfirm} = req.body

            if(!pseudo || !firstname || !lastname || !email || !password || !passwordConfirm) return res.status(404).json("il manque un champ")
            if(deleteEmptyKeys(req.body)) return res.status(404).json("merci de completer tous les champs")
            if(!checkEmail(email)) return res.status(404).json("email invalide")
            if(password !== passwordConfirm) return res.status(404).json("les mots de passe ne correspondent pas")
            if(!checkPassword(password)) return res.status(404).json("le mot de passe doit comporter au minimum 1 minuscule 1 majuscule 1 chiffre 1 caractere special : +")
            const userExist = await User.exists({$or: [{ email }, { lastname }, { pseudo }]})
            if(userExist) return res.status(404).json("vous etes déja enregistré")

            const newUser = new User(req.body)
            await newUser.save()
            res.json(newUser.registered)
            
           
        } catch (error) {
            res.status(500).json(error.message)
        }
        

    }
}