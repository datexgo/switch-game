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
      backgroundColor: props.color
    }
  }

  return <div className="cell" onClick={handleClick} style={getStyle()}>
    <div className="inner">
      {props.label ? <div>{props.label}</div> : null}
      {props.countdown ? <div>{props.countdown}</div> : null}
    </div>
  </div>
}

export default Cell