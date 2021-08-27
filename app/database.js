const mongoose = require("mongoose")



const dbConnection = (DB_URI, message) => {
module.exports = mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  authSource: "admin"
})
.then(connect => console.log(`mongoDB ${message} connected`))
.catch(err => console.log("mongoDB connection error :" + err))
}

process.env.NODE_ENV === 'production' ? dbConnection(process.env.DB_URI_PROD, "production") : dbConnection(process.env.DB_URI_DEV, 'developpement')






