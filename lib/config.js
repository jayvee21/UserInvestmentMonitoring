/**
 * Primary environment configuration of the API
 */
let config = {}

/**
 * HTTP Configurations
 */

// Staging Environment
config.staging = {
    'port': 3000,
    'httpsPort': 3001,
    'envName': 'staging'
 }

 // Production Environment
 config.production = {
    'port': 5000,
    'httpsPort': 5000,
    'envName': 'production'
 }


/**
 * Determine which environment to export
 */

let currentEnv = typeof(process.env.NODE_ENV) =='string' && process.env.NODE_ENV.trim().length > 0
                 ? process.env.NODE_ENV.trim().toLowerCase() : ''

let envToExport = typeof(config[currentEnv]) == 'object' ? config[currentEnv] : config.staging

/**
 * Export the module
 */
module.exports = envToExport