import React from "react"
import Cell from "./Cell"
import GameOverMessage from './GameOverMessage'
import getCellSize from "../helpers/getCellSize"
import getAvailableWindowSize from "../helpers/getAvailableWindowSize"

let getStyle = () => {
  let size = getAvailableWindowSize()
  return {
    width: size,
    height: size,
    margin: "0 auto",
    position: "relative"
  }
}

let Grid = (props) => {
  let {state, onCellTap, startGame} = props
  let size = getCellSize(state.cells.length)

  return <div className="grid" style={getStyle()}>
    <GameOverMessage size={getAvailableWindowSize()} gameOver={state.gameOver} startGame={startGame}/>
    {state.cells.map((cell, i) =>
      <Cell cell={cell} size={size} onClick={() => onCellTap(cell)} key={i}/>
    )}
  </div>
}

// Grip.propTypes = {
//   onCellTap: PT.function.isRequired,
// }

export default Grid