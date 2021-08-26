require("dotenv").config()
const path = require("path")
const express = require("express")
const cors = require("cors")
const router = require("./app/router")
const swaggerUI = require("swagger-ui-express");
const docs = require('./docs');
const helmet = require("helmet")
const xssClean = require("xss-clean")
const hpp = require("hpp")
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');


const app = express()

const PORT = process.env.PORT || 3000;

const dbChoice = (req, res, next) => {
   
	
    
    next()

}

// app.use(dbChoice)

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet())
app.use(xssClean())
app.use(hpp())
app.use(mongoSanitize());
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,    // 10 minutes
    max: 100                     // 100 requests per IP
});
app.use(limiter);



app.use("/api/v1", router)
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(docs));


app.listen(PORT, () => {
	console.log("listen on port: " + PORT)
})

