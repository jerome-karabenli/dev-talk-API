const {Schema, model} = require("mongoose")


const subjectSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    title: { type: String, required: true, max: 60 },
    description: { type: String, required: true },
    date: {type: Date, required: true},
    references: [{url: {type:String}, description: {type: String}}],
  }, { timestamps: true, versionKey: false })
  


subjectSchema.post("save", async function(){

  await this.populate({path: "author", select: "pseudo lastname firstname"}).execPopulate()
  
})

module.exports = model("Subject", subjectSchema, "subjects")

