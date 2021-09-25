const schema = require("../schemas")

module.exports = async (req, res, next) => {

    try {
        console.log("validator activated")
        
        const dataLocationsList = ["body", "query"]
        const dataLocation = dataLocationsList.find(location => Object.keys(req[location]).length)
        if(!dataLocation) return next()
        
        const urlSchemaMatch = req.url
            .split("/")
            .map(element => element.includes("?") ? element.split("?").shift() : element)
            .filter(element => element)
        
        const validData = await dataValidation(req[dataLocation], urlSchemaMatch, req.method)
        req[dataLocation] = validData
        next()

    } catch (error) {
        if(error.details) {
            return res.status(400).send(error.details[0].message)  
        }
        if(error.match(/schema match/)){
            console.log(error)
            return res.status(404).send(`Cannot ${req.method} ${req.originalUrl}`)
        }
        console.log(error)
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

        }else {
            
            return reject("no schema match")
        }
        
    })

}
   


const schemaNameFinder = (goodSchema, method) => {
    

        const schemaName = Object.keys(goodSchema).find(name => {
        
            if(method === "PATCH" && name.match(/update/gi)) return true
               
            if(method === "POST" && name.match(/create|login|register/gi)) return true
    
            if(method === 'GET' && name.match(/get|filter/gi)) return true
    
        })
        console.log(schemaName)
        if(!schemaName) throw new Error("no schema match")
        return schemaName
    
}