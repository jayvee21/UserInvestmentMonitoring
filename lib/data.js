/**
 * Library for CRUD of file system data
 */

let lib = {}

/**
 * Dependencies
 */
let fs = require('fs')
let path = require('path')

/**
 * Lib dependency
 */
let _helper = require('./helper')


/** Define the data base directory */
lib.baseDir = path.join(__dirname, '/../.data/')


/**
 * 
 * @param {*} dir as destination directory
 * @param {*} fileName string
 * @param {*} data as json
 * @param {*} callback response 
 */
lib.create = (dir, fileName, data, callback)=>{
    fs.open(lib.baseDir + dir + '/' + fileName + '.json', 'wx', (err, fileDescriptor )=>{
        if(!err && fileDescriptor){
            let dataStringObject = _helper.jsonToString(data)
            fs.writeFile(fileDescriptor, dataStringObject, (err)=>{
                if(!err){
                    fs.close(fileDescriptor, (err)=>{
                        if(!err){
                            callback(false)
                        }else{
                            callback('Could not close the new file. but its created.')
                        }
                    })
                    callback(false)
                }else{
                    callback('Could not create a new file')
                }
            })
        }else{
            callback('Could not create a new file. File already exist or target directory does not exist')
        }
    })
}
/**
 * @param {*} dir as destination directory
 * @param {*} fileName string
 * @param {*} callback response 
 */
lib.read = (dir, fileName, callback)=>{
    fs.readFile(lib.baseDir + dir + '/' + fileName + '.json', (err, data)=>{
        if(!err && data){
            data = _helper.strToJson(data)
            callback(err, data)
        }else{
            callback(err, data)
        }
    })
}

/**
 * 
 * @param {*} dir as destination directory
 * @param {*} fileName string
 * @param {*} data as json
 * @param {*} callback response 
 */
lib.update = (dir, fileName, data, callback)=>{
    fs.open(lib.baseDir + dir + '/' +fileName + '.json', 'r+', (err, fileDescriptor)=>{
        if(!err && fileDescriptor){
            fs.truncate(fileDescriptor, (err)=>{
                if(!err){
                    let dataStringObject = _helper.jsonToString(data)
                    fs.writeFile(fileDescriptor, dataStringObject, (err)=>{
                        if(!err){
                            fs.close(fileDescriptor, (err)=>{
                                if(!err){
                                    callback(false)
                                }else{
                                    callback('Could not close the updated file.')
                                }
                            })
                        }else{
                            callback('Could not update the file.')
                        }
                    })
                }else{
                    callback('Error on truncating the file.')
                }
            })
        }else{
            callback('Specified file does not exist')
        }
    })
}

lib.delete = (dir, fileName, callback)=>{
    fs.unlink(lib.baseDir + dir + '/' + fileName + '.json',(err)=>{
        if(!err){
            callback(false)
        }else{
            callback('Could not delete file.')
        }
    })
}

/** Export the module */
module.exports = lib