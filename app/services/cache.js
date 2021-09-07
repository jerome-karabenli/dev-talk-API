const db = require('../databases/redis');

const {promisify} = require('util');


const asyncClient = {
    get: promisify(db.get).bind(db),
    set: promisify(db.set).bind(db),
    setex: promisify(db.setex).bind(db),
    del: promisify(db.del).bind(db),
    exists: promisify(db.exists).bind(db)
}


const TIMEOUT = 60 * 30; // 30 minutes

const keys = [];

const cache = async (req, res, next) => {
   
    const key = `${req.url}`;
    if (keys.includes(key)) {
        const value =  JSON.parse(await asyncClient.get(key));
        console.log('reponse en cache')
        res.json(value);
    } else {

        const originalJson = res.json.bind(res);


        res.json = async data => {
            const jsonData = JSON.stringify(data);
            await asyncClient.setex(key, TIMEOUT, jsonData);
            keys.push(key);
            console.log("json modifié")
            originalJson(data);
        }

        next();
    }
}

const flush = async (_, __, next) => {

        for (const key of keys) {
            console.log('Removing key', key);
            await asyncClient.del(key);
        }

        keys.length = 0;
    
        next();
};

module.exports = {
    cache,
    flush
};