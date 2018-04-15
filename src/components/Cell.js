import React from "react"
import classNames from "classnames"

let getStyle = (size) =>({
  width: `${size}px`,
  height: `${size}px`,
  fontSize: `${Math.round(size / 4)}px`,
  lineHeight: `${Math.round(size / 2.2)}px`
})

let Cell = (props) => {
  let {cell, size, onClick} = props

  return <div className="cell" onClick={onClick} style={getStyle(size)}>
    <div className={classNames(cell.type, {
      "inner": true,
      "WAIT": cell.label == "WAIT",
      "TAP": cell.label == "TAP"
    })}>
      <div>{cell.label == "off" ? null : cell.label}</div>
      <div>{cell.countdown == null ? null : cell.countdown}</div>
    </div>
  </div>
}

// Cell.propTypes = {
//   onClick: PT.function.isRequired,
// }

export default Cell