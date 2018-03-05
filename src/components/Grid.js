import React from 'react'
import Cell from './Cell'
import getCellSize from '../helpers/getCellSize'
import getAvailableWindowSize from '../helpers/getAvailableWindowSize'

const Grid = (props) => {

  let getStyle = () => {
    return {
      width: getAvailableWindowSize(),
      height: getAvailableWindowSize(),
      margin: "0 auto"
    }
  }

  return <div className="grid" style={getStyle()}>{
    props.state.cells.map((cell, i) => {

      return <Cell
        cell={cell}
        size={getCellSize(props.state.cells.length)}
        countdown={cell.type == "off" ? null : cell.countdown}
        onClick={props.onClick}
        key={i}
      />
    })
  }</div>

}

export default Grid