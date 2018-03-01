import React from 'react'
import Cell from './Cell'

const TapCell = (props) => {
  return <Cell
    cell={props.cell}
    size={props.size}
    label="TAP"
    onClick={props.onTapped}
    countdown={props.countdown}
  />
}

export default TapCell