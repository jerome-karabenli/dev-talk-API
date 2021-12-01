const mongoose = require("mongoose")


module.exports = mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  authSource: "admin"
})
.then(connect => console.log(`mongoDB connected`))
.catch(err => console.log("mongoDB connection error :" + err))







