var isDev = require('../isDev');
var argv = require('yargs').argv;

module.exports = {
  notify: false,
  open: (argv.open || argv.o)
    ? 'local'
    : false,
  proxy: "build.clover.dev",
  reloadDelay: 500
}
