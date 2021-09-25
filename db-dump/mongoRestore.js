const {mongoTools, mtOptions} = require("./mongoDump")

const restore = async () => {
    try {
        const {filesystem} = await mongoTools.list(mtOptions)
        const lastBackup = filesystem[filesystem.length -1]
        const restoreOptions = {
            ...mtOptions,
            dumpFile: lastBackup,
            dropBeforeRestore: true
        }
       
        const {message, stderr} = await mongoTools.mongorestore(restoreOptions)
        console.log(message)
        if (stderr) console.info("stderr:\n", stderr);
          
    } catch (error) {
        console.log(error.message)
    }
}

restore()