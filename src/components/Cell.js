import React from 'react'
const classNames = require('classnames')

const Cell = (props) => {

  let handleClick = (event) => {
    event.preventDefault()
    if (props.onClick) {
      props.onClick(props.cell)
    }
  }

  let getStyle = () => {
    return {
      width: `${props.size}px`,
      height: `${props.size}px`,
      fontSize: `${Math.round(props.size / 4)}px`,
      lineHeight: `${Math.round(props.size / 2.2)}px`
    }
  }

  return <div className="cell" onClick={handleClick} style={getStyle()}>
    <div className={classNames({
      "inner": true,
      "wait": props.cell.type == "WAIT",
      "tap": props.cell.type == "TAP",
      "disabled": props.cell.type == "off"
    })}>
      {props.cell.type == "off" ? null : <div>{props.cell.type}</div>}
      {props.countdown ? <div>{props.countdown}</div> : null}
    </div>
  </div>
}

export default Cell
