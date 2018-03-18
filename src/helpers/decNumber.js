import * as R from '@paqmind/ramda'

const decNumber = (x) => R.is(Number, x) ? (x >= 2 ? x - 1 : null) : null

export default decNumber