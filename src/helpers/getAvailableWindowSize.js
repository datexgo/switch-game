let getAvailableWindowSize = () => {
  let availHeight = window.innerHeight - 200
  return window.innerWidth > availHeight
    ? availHeight - 20
    : window.innerWidth - 20
}

export default getAvailableWindowSize
