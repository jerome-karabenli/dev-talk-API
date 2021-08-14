const mongoose = require("mongoose")


const commentSchema = new mongoose.Schema({

    body: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  }, { timestamps: true })
  
commentSchema.post("save", async function (){
  await this.populate({path:"author", model: "User", select: 'pseudo lastname firstname'}).execPopulate()
  // await this.populate({path:"subject", model: "Subject", select: 'title description references'}).execPopulate()
})

module.exports = mongoose.model("Comment", commentSchema, "comments")