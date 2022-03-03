const redis = require('redis');
const url = process.env.REDIS_URI

const client = redis.createClient({ url });

client.ping((err, data) => {
    if(err) console.log(err)
    if(data === 'PONG') console.log('Redis database connected')
})

client.on("error", (error) => {
    console.log(error)
});

module.exports = client

