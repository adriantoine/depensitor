import addToNumber from 'addToNumber'
import oneHundred from 'oneHundredPackage'
import unusedDep from 'unusedDep'
import unusedDep2 from 'otherVar'
import add from './single-common-js-dep'
import unusedDep3 from '../test'
import anotherUnusedDep from './test/test2/component'

function add100(a, b) {
  return addToNumber(oneHundred, b)
}

module.exports = add100
