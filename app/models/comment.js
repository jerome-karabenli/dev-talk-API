const {Schema, model} = require("mongoose")


const commentSchema = new Schema({

    body: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
  }, { timestamps: true, versionKey: false })
  
commentSchema.post("save", async function (){
  await this.populate({path:"author", model: "User", select: 'pseudo lastname firstname'}).execPopulate()

})

module.exports = model("Comment", commentSchema, "comments")