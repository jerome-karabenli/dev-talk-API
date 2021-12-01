const db = require('../databases/redis');

const {promisify} = require('util');

module.exports = {
    get: promisify(db.get).bind(db),
    set: promisify(db.set).bind(db),
    setex: promisify(db.setex).bind(db),
    del: promisify(db.del).bind(db),
    exists: promisify(db.exists).bind(db)
}