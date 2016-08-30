/* eslint-disable */

module.exports = {
  "name": "test",
  "version": "1.0.0",
  "description": "test",
  "main": "index.js",
  "scripts": {
    "bench": "node bench",
    "test": "eslint . && ava",
    "watch": "ava --watch"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "dep-one": "^6.13.0",
    "dep-five": "^6.13.0",
  },
  "devDependencies": {
    "dep-two": "^0.16.0"
  }
}
