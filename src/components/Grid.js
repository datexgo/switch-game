import React from 'react'
import PropTypes from 'prop-types'

import Cell from './Cell'
import GameMessage from './GameMessage'

import getCellSize from '../helpers/getCellSize'
import getAvailableWindowSize from '../helpers/getAvailableWindowSize'

const getStyle = () => {
  const size = getAvailableWindowSize()
  return {
    width: size,
    height: size,
    margin: '0 auto',
    position: 'relative'
  }
}

const Grid = (props) => {
  const { state, onCellTap } = props
  const size = getCellSize(state.cells.length)

  return <div className="grid" style={getStyle()}>
    <GameMessage size={getAvailableWindowSize()}
      state={state} />

    {state.cells.map((cell, i) =>
      <Cell className="game-cell"
        cell={cell} size={size}
        onClick={() => onCellTap(cell)}
        key={i}/>
    )}
  </div>
}

Grid.propTypes = {
  state: PropTypes.object.isRequired,
  onCellTap: PropTypes.func.isRequired
}

export default Grid
