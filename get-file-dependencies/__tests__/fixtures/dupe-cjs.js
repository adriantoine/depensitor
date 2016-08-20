const addToNumber = require('addToNumber')
const oneHundred = require('oneHundred')
const oneMillion = require('oneHundred')
const unusedDep = require('unusedDep')
const unusedDep2 = require('unusedDep')('test', 1)

function add100(a, b) {
  return addToNumber(oneHundred, b)
}

module.exports = add100
