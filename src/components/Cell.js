import React from 'react'

const Cell = (props) => {

  let handleClick = (event) => {
    event.preventDefault()
    if (props.onclick) {
      props.onclick(props.cell)
    }
  }

  let getStyle = () => {
    return {
      width: `${props.size}px`,
      height: `${props.size}px`,
      fontSize: `${Math.round(props.size / 4)}px`,
      lineHeight: `${Math.round(props.size / 2.2)}px`,
      backgroundColor: props.cell.color,
      float: "left"
    }
  }

  return <div className="cell" onClick={handleClick} style={getStyle()}>
    <div className="inner">
      {props.cell.label ? <div>{props.cell.label}</div> : null}
      {props.cell.countdown ? <div>{props.cell.countdown}</div> : null}
    </div>
  </div>
}

export default Cell