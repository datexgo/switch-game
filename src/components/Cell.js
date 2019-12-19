import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { cellText } from '../utils/utils'

const getStyle = (size) => ({
  width: `${size}px`,
  height: `${size}px`,
  fontSize: `${Math.round(size / 4)}px`,
  lineHeight: `${Math.round(size / 2.2)}px`
})

const Cell = (props) => {
  const { cell, size, onClick } = props

  return <div className="cell" onClick={onClick} style={getStyle(size)}>
    <div className={classNames(cell.type, {
      inner: true,
      WAIT: cell.label === 'WAIT',
      TAP: cell.label === 'TAP'
    })}>
      <div>{cell.label === 'off' ? null : cellText(cell)}</div>
      <div>{cell.countdown == null ? null : cell.countdown}</div>
    </div>
  </div>
}

Cell.propTypes = {
  onClick: PropTypes.func.isRequired,
  cell: PropTypes.object.isRequired,
  size: PropTypes.number.isRequired
}

export default Cell
