
const mongoose = require("mongoose")

const DB_URI = process.env.DB_URI || 'mongodb://exemple:exemple@127.0.0.1:27017/devtalk'

module.exports = mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  authSource: "admin"
})
.then(connect => console.log("mongoDB connected"))
.catch(err => console.log("mongoDB connection error :" + err))








