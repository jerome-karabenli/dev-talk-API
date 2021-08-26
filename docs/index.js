const basicInfo = require('./basicInfo');
const servers = require('./servers');
const components = require('./components');
const tags = require('./tags');
const models = require('./models');


module.exports = {
    ...basicInfo,
    ...servers,
    ...components,
    ...tags,
    ...models

};