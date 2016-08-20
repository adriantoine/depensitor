const addToNumber = require('addToNumber')
const oneHundred = require('oneHundredPackage')
const unusedDep = require('unusedDep')
const unusedDep2 = require('otherVar')
const add = require('./single-common-js-dep')
const unusedDep3 = require('../test')
const anotherUnusedDep = require('./test/test2/component')

function add100(a, b) {
  return addToNumber(oneHundred, b)
}

module.exports = add100
