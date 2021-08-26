const {Schema, model} = require("mongoose")
const bcrypt = require("bcryptjs")


const userSchema = new Schema({
  pseudo: { type: String, required: true, max: 30 },
  lastname: { type: String, required: true, max: 30, uppercase: true },
  firstname: { type: String, required: true, max: 30 },
  email: { type: String, required: true, max: 30 },
  password: { type: String, required: true },
  picture: { type: String }, 
  role: [{ type: String }],
  registered: {type: Boolean},
  subjects: [{ type: Schema.Types.ObjectId, ref: 'Subject' }]
}, { timestamps: true, versionKey: false })


// userSchema.post("save", async function(){
//   await this.populate({path: "subjects"}).execPopulate()
// }) 

userSchema.pre("save", async function(){
 
  this.registered = true
  this.role.push("user")
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)

})

module.exports = model("User", userSchema, "users") 

