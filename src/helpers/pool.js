import K from 'kefir'

export const pool = () => {
  const pool = K.pool()
  const _plug = pool.plug.bind(pool)
  pool.plug = function (x) {
    if (x instanceof K.Property || x instanceof K.Stream || x instanceof K.Observable) {
      _plug(x)
    } else {
      _plug(K.constant(x))
    }
  }
  return pool
}
