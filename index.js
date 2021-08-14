require("dotenv").config()
const path = require("path")
const express = require("express")
const cors = require("cors")
const multer  = require('multer')
const router = require("./app/router")




const app = express()

const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(multer())


app.use("/v1", router)



app.listen(PORT, () => {
	console.log("listen on port: " + PORT)
})

