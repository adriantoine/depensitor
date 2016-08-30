import addToNumber from '@test/my-org/addToNumber'
import oneHundred from '@test/my-org/oneHundredPackage'
import unusedDep from '@test/my-org/nested/one/unusedDep'
import otherVar from '@test/my-org'

const add100 = (a, b) => addToNumber(oneHundred, b)

export default add100
