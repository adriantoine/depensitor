const addToNumber = require('addToNumber')
const addToNumberSub = require('addToNumber/subDeb')
const oneHundred = require('oneHundredPackage/subFolder/deep/to/test')
const unusedDep = require('unusedDep')
const otherVar = require('otherVar')

function add100(a, b) {
  return addToNumber(oneHundred, b)
}

module.exports = add100
