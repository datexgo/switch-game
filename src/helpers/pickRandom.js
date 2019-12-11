import rand from './rand'

const pickRandom = (xs) => xs[rand(0, xs.length)]

export default pickRandom
