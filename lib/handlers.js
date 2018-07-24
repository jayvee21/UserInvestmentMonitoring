/**
 * Primary handlers of all request
 */
let handlers = {}

/**
 * Not Found handler
 * Required fields: none
 * Response to undefined path request
 */

handlers.notFound = (data, callback)=>{
    callback(404)
}

/**
 * Ping 
 * Required fields: none
 * Response 200
 */

handlers.ping = (data, callback)=>{
    callback(200, {'response': 'System is up and running.'})
}


/**
 * Export the module
 */
module.exports = handlers