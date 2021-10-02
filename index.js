// required modules
require("dotenv").config()

const express = require("express")
const cors = require("cors")
const swaggerUI = require("swagger-ui-express");
const helmet = require("helmet")
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const https = require('https')
const fs = require("fs")

// env variables
const PORT = process.env.PORT
const ENV = process.env.NODE_ENV
const DOMAIN = process.env.DOMAIN
const API_URL_PREFIX = process.env.API_URL_PREFIX
const HTTPS = process.env.HTTPS

// required files
const docs = require('./docs/swagger');
const router = require("./app/router")

// launch scheduled dump of mongoDB database
if(ENV === "production") require("./db-dump/node-cron");



const app = express()

// enable json and encoded url on express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// server securities
app.use(mongoSanitize({replaceWith: '_'}));
const limiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 100 });
app.use(limiter);

app.use(cors({origin: [
  `https://${DOMAIN}:${PORT}`,
  `http://localhost:${PORT}`
]}))

app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(docs));
app.use(API_URL_PREFIX, helmet(), router)


const certFiles = {
  key: fs.readFileSync("./ssl/privkey.pem"),
  cert: fs.readFileSync("./ssl/fullchain.pem")
};


if(HTTPS === "true") https.createServer(certFiles, app).listen(PORT, () => console.log(`HTTPS server up, listen on port: ${PORT}`));
else app.listen(PORT, () => console.log(`HTTP server up, listen on port: ${PORT}`));





