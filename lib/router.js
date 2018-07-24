/**
 * Routes the request path to handlers
 */
// Dependency
let _handlers = require('./handlers')
let router = {
    'ping' : _handlers.ping,
    'notFound': _handlers.notFound
}

/** Export the module */
module.exports = router