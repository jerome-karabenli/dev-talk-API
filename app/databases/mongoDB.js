const mongoose = require("mongoose")
const ENV = process.env.NODE_ENV

if(ENV === 'production'){
  module.exports = mongoose.connect(process.env.MONGODB_URI_PROD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    authSource: "admin"
  })
  .then(connect => console.log(`mongoDB production connected`))
  .catch(err => console.log("mongoDB connection error :" + err))

}else {
  module.exports = mongoose.connect(process.env.MONGODB_URI_DEV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    authSource: "admin"
  })
  .then(connect => console.log(`mongoDB dev connected`))
  .catch(err => console.log("mongoDB connection error :" + err))
}






