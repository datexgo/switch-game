import getAvailableWindowSize from './getAvailableWindowSize'

const getCellSize = (length) => {
  return Math.floor(getAvailableWindowSize() / Math.sqrt(length))
}

export default getCellSize