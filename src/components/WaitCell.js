import React from 'react'
import Cell from './Cell'

const WaitCell = (props) => {
  return <Cell
    cell={props.cell}
    size={props.size}
    label="WAIT"
    countdown={props.countdown}
  />
}

export default WaitCell