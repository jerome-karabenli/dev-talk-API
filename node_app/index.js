// required modules
require("dotenv").config()

const express = require("express")
const cors = require("cors")
const swaggerUI = require("swagger-ui-express");
const helmet = require("helmet")
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');


// env variables
const PORT = process.env.PORT
const DOMAIN_NAME = process.env.DOMAIN
const API_URL_PREFIX = process.env.API_URL_PREFIX

// required files
const docs = require('../docs/swagger');
const router = require("./app/router")

const app = express()

// enable json and encoded url on express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// server securities
app.use(mongoSanitize({replaceWith: '_'}));
const limiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 100 });
app.use(limiter);

const corsOptions = {
  origin: `https://${DOMAIN_NAME}`,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(docs));
app.use(helmet(), router)


app.listen(PORT, () => console.log(`HTTP server up, listen on port: ${PORT}\nSwagger ui available on http://localhost:${PORT}/api-docs`))