/**
 * Server related library
 */
let server = {}
/**
 * Dependency
 */
let http = require('http')
let url = require('url')
let stringDecoder = require('string_decoder').StringDecoder
let https = require('https')
let path  = require('path')
let fs = require('fs')
/**
 * Lib dependency
 */
let _config = require('./config')
let _helper = require('./helper')
let _router = require('./router')
let _data = require('./data')

/**
 * HTTP Server
 */
server.httpServer = http.createServer((req, res)=>{
    server.unifiedServer(req, res)
})

/**
 * HTTPS Server
 */

// Https Server Options
// 
/**
 * NOTE: UNCOMMENT THE HTTPS BELOW ONCE PEM FILES ARE GENERATED.
 * TO GENERATE PEM FILES, PLEASE READ THE README.MD
 */
// let httpsServerOption = {
//     'key': fs.readFileSync( path.join(__dirname, '/./../https/key.pem')),
//     'cert': fs.readFileSync( path.join(__dirname, '/./../https/cert.pem'))
// }
// let httpsServer = https.createServer(httpsServerOption, (req, res)=>{
//     server.unifiedServer(req, res)
// })

/**
 * Handles the HTTP and HTTPS logic
 */
server.unifiedServer = (req, res)=>{
    let parseUrl = url.parse(req.url, true)
    let pathName = parseUrl.pathname.toLowerCase()
    let trimmedPath = pathName.replace(/^\/+|\/$/g,'')
    // Request Query
    let queryStringObject = parseUrl.query
    // Method 
    let method = req.method
    // Headers
    let headers = req.headers
    // Payloads
    let buffer = ''
    let decoder = new stringDecoder()

    // Emit request data
    req.on('data', (data)=>{
        buffer += decoder.write(data)
    })

    // Emit request end
    req.on('end', ()=>{
        buffer += decoder.end()

        server.selectedHandler = typeof(_router[trimmedPath]) != 'undefined' 
                                 ? _router[trimmedPath] : _router.notFound
        let data = {
            'path' : trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': _helper.strToJson(buffer)
        }
        server.selectedHandler(data, (statusCode, payload)=>{
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200
            payload = typeof(payload) == 'object' ? payload : {}
            // Convert the payload object to string before sending as response
            let strPayload = _helper.jsonToString(payload)
            res.writeHead(statusCode, {'Content-type': 'text/json'})
            res.write(strPayload)
            res.end()
        })
        
    })
}

/**
 * Initialize the components
 */
server.init = ()=>{
    // Run the HTTP server
    server.httpServer.listen(_config.port, ()=>{
        console.log(`Http server is running at port ${_config.port}. ${_config.envName.toUpperCase()} mode.`)
    })
}

/**
 * Export module
 */
module.exports = server