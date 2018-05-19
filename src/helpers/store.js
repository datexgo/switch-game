import * as R from "@paqmind/ramda"

function Store(action$) {
  return action$
    .scan((state, fn) => {
      if (R.is(Function, fn)) {
        return fn(state)
      } else {
        throw Error(`dispatched value must be a function, got ${typeof fn}`)
      }
    }, null)
    .skipDuplicates()
}

export default Store