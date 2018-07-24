/**
 * Helper for some related tasks
 */

let helper = {}

/**
 * Convert string to JSON (vice versa)
 */

helper.strToJson = (str)=>{
    try{
        return JSON.parse(str)
    }catch(e){
        return false
    }
}

helper.jsonToString = (str)=>{
    try{
        return JSON.stringify(str)
    }catch(e){
        return false
    }
}


// Export module
module.exports = helper