const addToNumber = require('@test/my-org/addToNumber')
const oneHundred = require('@test/my-org/oneHundredPackage')
const unusedDep = require('@test/my-org/nested/one/unusedDep')
const otherVar = require('@test/my-org')

const add100 = (a, b) => addToNumber(oneHundred, b)

export default add100
