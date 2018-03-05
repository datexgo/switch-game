const replaceAt = (list, index, value) => {
  let start = list.slice(0, index)
  let end = list.slice(index + 1, list.length)
  return start.concat(value, end)
}

export default replaceAt