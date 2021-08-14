const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const { checkEmail, checkPassword } = require("../utils") 

const userSchema = new mongoose.Schema({
  pseudo: { type: String, required: true, max: 20 },
  lastname: { type: String, required: true, max: 20, uppercase: true },
  firstname: { type: String, required: true, max: 25 },
  email: { type: String, required: true, max: 30 },
  password: { type: String, required: true },
  picture: { type: String }, 
  registered: { type: Boolean, default: false },
  role: { type: String, default: "user" },
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }]
}, { timestamps: true })


// userSchema.post("save", async function(){
//   await this.populate({path: "subjects"}).execPopulate()
// }) 

userSchema.pre("save", async function(){
 
  this.registered = true
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)

})

module.exports = mongoose.model("User", userSchema, "users") 

