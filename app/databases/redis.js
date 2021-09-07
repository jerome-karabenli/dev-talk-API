const redis = require('redis');
const url = process.env.REDIS_URL

client = redis.createClient({url})

client.on("error", (error) => {
    console.log(error)
});

module.exports = client

