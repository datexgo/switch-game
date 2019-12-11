import * as R from '@paqmind/ramda'

const decNumber = (x) => R.is(Object, x)
  ? (x.countdown >= 2 ? { ...x, countdown: x.countdown - 1 } : x)
  : null

export default decNumber
