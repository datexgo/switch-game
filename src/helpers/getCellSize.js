import getAvailableWindowSize from "./getAvailableWindowSize"

let getCellSize = (length) => {
  return Math.floor(getAvailableWindowSize() / Math.sqrt(length))
}

export default getCellSize
