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
    <div className={classNames(props.cell.type,
      {"disabled": props.cell.type == "off", "inner": true})}>
      {props.cell.type == "off" ? null : <div>{props.cell.type}</div>}
      {props.countdown ? <div>{props.countdown}</div> : null}
    </div>
  </div>
}

export default Cell
