const { User } = require("../models")
const bcrypt = require("bcryptjs")

module.exports = async (req, res, next) => {
    if(!req.body.oldPassword) return next()

    const {oldPassword, newPassword} = req.body
    const {_id} = req.tokenPayload

    const {password} = await User.findOne({_id}, {password:1, _id:0})

    const compare = await bcrypt.compare(oldPassword, password)
    if(!compare) return res.status(401).send({error: 'Unauthorized'})
    
    const salt = await bcrypt.genSalt(10)
    req.body.password = await bcrypt.hash(newPassword, salt)

    delete req.body.oldPassword
    delete req.body.newPassword
    delete req.body.newPasswordConfirm

    next()

}