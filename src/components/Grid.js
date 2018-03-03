import React from 'react'
import Cell from './Cell'

const Grid = (props) => {

  let getAvailableWindowSize = () => {
    let availHeight = window.innerHeight - 200
    return window.innerWidth > availHeight
      ? availHeight
      : window.innerWidth
  }

  let getNumberOfCells = () => {
    let size = props.state.level + 1
    return size * size
  }

  let getCellSize = () => {
    return Math.floor(getAvailableWindowSize() / Math.sqrt(getNumberOfCells()))
  }

  let cells = new Array(getNumberOfCells()).fill(props.state)

  let getStyle = () => {
    return {
      width: getAvailableWindowSize(),
      height: getAvailableWindowSize(),
      margin: "0 auto"
    }
  }

  return <div className="grid" style={getStyle()}>{
    cells.map((cell, i) => {
      return <Cell cell={cell} size={getCellSize()} key={i} />
    })
  }</div>

}

export default Grid