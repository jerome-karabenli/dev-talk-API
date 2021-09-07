const cron = require('node-cron');
const {mongoTools, mtOptions} = require('./mongoDump')


// const deleteOldBackup = () => {
//     const shellCommand = `find ${path.join(__dirname,'backup/')} -type f -ctime -6 -exec rm -- '{}' +`
//     exec(shellCommand, (error, stdout, stderr) => {
//         if (error) return console.log(error.message);
        
//         if (stderr) return console.log(stderr);
        
//         return console.log("old backup deleted")
//     })
// }



// cron.schedule('30 * * * * *', deleteOldBackup)
cron.schedule('0 1 * * *', async () => {
    try {
        const dump = await mongoTools.mongodump(mtOptions)
        console.log(dump.message)
    } catch (error) {
        console.log(error.message)
    }
    
    
})