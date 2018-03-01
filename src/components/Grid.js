import React from 'react'
import Cell from './Cell'
import TapCell from './TapCell'
import WaitCell from './WaitCell'

const Grid = (props) => {

  let getCellComponent = (cell, key) => {
    switch (cell.type) {
      case "CELL_WAIT":
        return <WaitCell
          key={key}
          cell={cell}
          size={cell.size}
          countdown={cell.countdown}
        />

      case "CELL_TAP":
        return <TapCell
          key={key}
          cell={cell}
          size={cell.size}
          countdown={cell.countdown}
        />

      default:
        <Cell key={key} cell={cell} size={cell.size} />
    }
  }

  let getStyle = () => {
    //...
  }

  return <div className="grid" style={getStyle()}>{
    cells$.map((cell, i) => {
      return getCellComponent(cell, i)
    })
  }</div>

}

export default Grid