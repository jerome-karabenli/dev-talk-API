const mongoose = require("mongoose")


const subjectSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    title: { type: String, required: true, max: 20 },
    description: { type: String, required: true },
    date: {type: Date, required: true},
    references: [{type: Object}],
  }, { timestamps: true })
  


subjectSchema.pre("save", async function(){
 
  await this.populate({path: "author", select: "pseudo lastname firstname"}).execPopulate()
  
})

module.exports = mongoose.model("Subject", subjectSchema, "subjects")

