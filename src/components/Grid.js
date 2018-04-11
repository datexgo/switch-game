import React from "react"
import Cell from "./Cell"
import GameMessage from './GameMessage'
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
  let {state, onCellTap, startNewGame, startNextLevel} = props
  let size = getCellSize(state.cells.length)

  return <div className="grid" style={getStyle()}>
    <GameMessage size={getAvailableWindowSize()}
                 state={state}
                 startNewGame={startNewGame}
                 startNextLevel={startNextLevel}
    />
    {state.cells.map((cell, i) =>
      <Cell className="game-cell" cell={cell} size={size} onClick={() => onCellTap(cell)} key={i}/>
    )}
  </div>
}

// Grip.propTypes = {
//   onCellTap: PT.function.isRequired,
// }

export default Grid