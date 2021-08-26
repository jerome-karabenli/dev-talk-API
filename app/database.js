const mongoose = require("mongoose")



const dbProd = mongoose.createConnection(process.env.DB_URI_PROD, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  authSource: "admin"
})
.then(connect => console.log("mongoDB production connected"))
.catch(err => console.log("mongoDB connection error :" + err))

const dbDev = mongoose.createConnection(process.env.DB_URI_DEV, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  authSource: "admin"
})
.then(connect => console.log("mongoDB develop connected"))
.catch(err => console.log("mongoDB connection error :" + err))


module.exports = { dbDev, dbProd}





