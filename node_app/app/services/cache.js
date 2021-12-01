const asyncClient = require('../utils/redis_promisify')
const {decryptAccesToken} = require('./authJwt')


const TIMEOUT = 60 * 30; // 30 minutes

const keys = [];


module.exports = async (req, res, next) => {
    try {
        console.log(keys)
        if(req.method === "GET"){

            const tokenData = await decryptAccesToken(req.headers['authorization'])
            
            let key;
            if(!tokenData) key = req.url
            else key = req.url + tokenData._id
            
            if (keys.includes(key)) {
                const value =  JSON.parse(await asyncClient.get(key));
                console.log('cached response')
                res.json(value);
            } 
            else {

                const originalJson = res.json.bind(res);

                res.json = async (data) => {
                    
                    const jsonData = JSON.stringify(data);

                    if(jsonData.match(/error|undefined/gi)) return originalJson(data)

                    await asyncClient.setex(key, TIMEOUT, jsonData);

                    keys.push(key);

                    console.log("modified json")

                    originalJson(data);
                          
                }

                next();
            }
        }else {
            
            const cachedKeys = keys.filter(key => key.includes(`${req.url}?`) || key.includes(req.url))
            if(!cachedKeys.length) return next()
            
            console.log('Removing keys', cachedKeys);

            await asyncClient.del(cachedKeys);
            
            for(const key of cachedKeys) keys.splice(keys.indexOf(key), 1)
           
            next();
        }

    } catch (error) {
        console.log(error.message)
        next(error)
    }
}



