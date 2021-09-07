const { MongoTools } = require("node-mongotools");
const path = require("path")


const mongoTools = new MongoTools();

const mtOptions = {
        uri: `${process.env.MONGODB_URI_DEV}?authSource=admin`,
        path: path.join(__dirname, 'backup'),
        rotationWindowsDays: 3,
        rotationMinCount: 1     
};

mongoTools.rotation(mtOptions)
.catch(error => console.log(error.message))

module.exports = {mongoTools, mtOptions}

