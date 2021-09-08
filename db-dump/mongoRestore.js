const {mongoTools, mtOptions} = require("./mongoDump")

const restore = async () => {
    try {
        const backupsList = await mongoTools.list(mtOptions)
        const lastBackup = backupsList.filesystem[backupsList.filesystem.length -1]
        const restoreOptions = {
            ...mtOptions,
            dumpFile: lastBackup,
            dropBeforeRestore: true
        }
        
        const restored = await mongoTools.mongorestore(restoreOptions)
        console.log(restored.message)
        if (restored.stderr) console.info("stderr:\n", restored.stderr);
          
    } catch (error) {
        console.log(error.message)
    }
}

restore()