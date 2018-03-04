import React from 'react'
import Cell from './Cell'

const Grid = (props) => {

  let getAvailableWindowSize = () => {
    let availHeight = window.innerHeight - 200
    return window.innerWidth > availHeight
      ? availHeight
      : window.innerWidth
  }

  let getCellSize = () => {
    return Math.floor(getAvailableWindowSize() / Math.sqrt(props.state.cells.length))
  }

  let getStyle = () => {
    return {
      width: getAvailableWindowSize(),
      height: getAvailableWindowSize(),
      margin: "0 auto"
    }
  }

  return <div className="grid" style={getStyle()}>{
    props.state.cells.map((cell, i) => {
      return <Cell cell={cell} size={getCellSize()} onClick={props.onClick} key={i} />
    })
  }</div>

}

export default Grid