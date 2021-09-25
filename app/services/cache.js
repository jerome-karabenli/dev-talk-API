const asyncClient = require('../utils/redis_promisify')


const TIMEOUT = 60 * 30; // 30 minutes

const keys = [];


module.exports = async (req, res, next) => {
    
    try {
        if(req.method === "GET"){
            const key = req.url;
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
            
            const key = keys.find(key => key === req.url)
            if(!key) return next()

            console.log('Removing key', key);
            
            await asyncClient.del(key);

            const keyIndex = keys.indexOf(key)

            keys.splice(keyIndex, 1)
            
            next();
        }

    } catch (error) {
        next(error)
    }
}



