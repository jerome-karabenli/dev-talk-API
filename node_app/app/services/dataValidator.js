const schema = require("../schemas")

module.exports = async (req, res, next) => {

    try {
        console.log("validator activated")
        
        const dataLocationsList = ["body", "query"]
        const dataLocation = dataLocationsList.find(location => Object.keys(req[location]).length)
        if(!dataLocation) return next()
        
        const urlSchemaMatch = req.url
            .split("/")
            .map(urlPart => urlPart.includes("?") ? urlPart.split("?").shift() : urlPart)
            .filter(urlPart => urlPart)


        const validData = await dataValidation(req[dataLocation], urlSchemaMatch, req.method)
        req[dataLocation] = validData
        next()

    } catch (error) {
        if(error.details) {
            return res.status(400).send({error: error.details[0].message})  
        }
        
        
        res.status(404).send(error)
        
    }

        
    
}


const dataValidation = (data, ValidSchema, httpMethod) => {

    return new Promise((resolve, reject) => {
        
        if(schema[ValidSchema]){
            
            const {error, value} = schema[ValidSchema][schemaNameFinder(schema[ValidSchema], httpMethod)].validate(data)
            
            if(error) reject(error)

            else resolve(value)

        }else if(schema.auth[ValidSchema]) {
            
            const {error, value} = schema.auth[ValidSchema].validate(data)

            if(error) reject(error)

            else resolve(value)

        }else if(schema[ValidSchema[0]][ValidSchema[1]]) {
            
            const {error, value} = schema[ValidSchema[0]][ValidSchema[1]][schemaNameFinder(schema[ValidSchema[0]][ValidSchema[1]], httpMethod)].validate(data)

            if(error) reject(error)

            else resolve(value)

        }else {
            
            return reject("no schema match")
        }
        
    })

}
   


const schemaNameFinder = (goodSchema, httpMethod) => {
    

        const schemaName = Object.keys(goodSchema).find(name => {
        
            if(httpMethod === "PATCH" && name.match(/update/gi)) return true
               
            if(httpMethod === "POST" && name.match(/create|login|register/gi)) return true
    
            if(httpMethod === 'GET' && name.match(/get|filter/gi)) return true

            if(httpMethod === 'DELETE' && name.match(/delete|remove/gi)) return true
    
        })
        console.log(schemaName)
        if(!schemaName) throw new Error("no schema match")
        return schemaName
    
}