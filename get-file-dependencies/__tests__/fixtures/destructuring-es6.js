import { addToNumber } from 'addToNumber'
import oneHundred from 'oneHundredPackage'
import { unusedDep, anotherOne } from 'unusedDep'
import unusedDep2 from 'unusedDep'

function add100(a, b) {
  return addToNumber(oneHundred, b)
}

module.exports = add100
