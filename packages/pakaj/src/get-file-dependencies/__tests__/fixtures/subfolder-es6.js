import addToNumber from 'addToNumber'
import addToNumberSub from 'addToNumber/subDeb'
import oneHundred from 'oneHundredPackage/subFolder/deep/to/test'
import unusedDep from 'unusedDep'
import otherVar from 'otherVar'

function add100(a, b) {
  return addToNumber(oneHundred, b)
}

module.exports = add100
