require("dotenv").config()
const path = require("path")
const express = require("express")
const cors = require("cors")
const router = require("./app/router")
const swaggerUI = require("swagger-ui-express");
const docs = require('./docs/swagger');
const helmet = require("helmet")
const xssClean = require("xss-clean")
const hpp = require("hpp")
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const https = require('https')
const fs = require("fs")
let PORT;

const app = express()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(xssClean())
app.use(hpp())
app.use(mongoSanitize());
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100            
});
app.use(limiter);

if(process.env.NODE_ENV === "developpement"){
  
  app.use(cors())
  
  app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(docs));
  
  PORT = 3001;
  
}else {
  app.use(cors({origin: ["https://rpiweb.hopto.org:3000", "http://rpiweb.hopto.org:3000", "http://localhost:3000", "https://localhost:3000"]}))
  PORT = 3000;
}

app.use("/devtalk/api/v1", helmet(), router)


const options = {
  key: fs.readFileSync("./ssl/privkey.pem"),
  cert: fs.readFileSync("./ssl/fullchain.pem")
};


if(process.env.HTTPS === 'enabled'){
  https.createServer(options, app).listen(PORT, () => {
    console.log("HTTPS server up, listen on port: " + PORT); 
  });
}else {
  app.listen(PORT, () => {
	  console.log("HTTP server up, listen on port: " + PORT)
  })
}


