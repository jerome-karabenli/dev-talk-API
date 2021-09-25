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
cron.schedule('0,15,30,45 * * * * *', async () => {
    try {
        const {message} = await mongoTools.mongodump(mtOptions)
        console.log(message)
    } catch (error) {
        console.log(error.message)
    }
    
    
})