var argv = require('yargs').argv;

module.exports = process.env.NODE_ENV = argv.env || argv.e || 'development';
