import { windowPadding, gridPadding } from '../utils/constants'

const getAvailableWindowSize = () => {
  const availHeight = window.innerHeight - windowPadding

  return window.innerWidth > availHeight
    ? availHeight - gridPadding
    : window.innerWidth - gridPadding
}

export default getAvailableWindowSize
