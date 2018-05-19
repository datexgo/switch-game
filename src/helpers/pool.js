let K = require('kefir')

function pool() {
  let pool = K.pool()
  let _plug = pool.plug.bind(pool)
  pool.plug = function (x) {
    if (x instanceof K.Property || x instanceof K.Stream || x instanceof K.Observable) {
      _plug(x)
    } else {
      _plug(K.constant(x))
    }
  }
  return pool
}

export default pool