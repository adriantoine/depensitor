const { addToNumber } = require('addToNumber')
const oneHundred = require('oneHundredPackage')
const { unusedDep, anotherOne } = require('unusedDep')
const unusedDep2 = require('unusedDep')

function add100(a, b) {
  return addToNumber(oneHundred, b)
}

module.exports = add100
