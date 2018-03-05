const getAvailableWindowSize = () => {
  let availHeight = window.innerHeight - 200
  return window.innerWidth > availHeight
    ? availHeight
    : window.innerWidth
}

export default getAvailableWindowSize