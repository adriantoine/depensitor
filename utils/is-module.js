// Module RegExp from https://github.com/webpack/enhanced-resolve/blob/master/lib/Resolver.js
const NOT_MODULE_REGEXP = /^\.$|^\.[\\\/]|^\.\.$|^\.\.[\/\\]|^\/|^[A-Z]:[\\\/]/i;

export default name => name && name.match && !name.match(NOT_MODULE_REGEXP);
