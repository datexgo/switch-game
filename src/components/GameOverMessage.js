import React from 'react'
let classNames = require('classnames')

let getStyle = (size) => {
  return {
    width: size,
    height: size,
    fontSize: `${Math.round(size / 5)}px`
  }
}

//переработать компонет для совместного использования с междууровневым сообщением

let getButtonStyle = (size) => {
  return {
    width: `${Math.round(size / 2)}px`,
    height: `${Math.round(size / 7)}px`,
    fontSize: `${Math.round(size / 20)}px`
  }
}

const GameOverMessage = (props) => {
  let state = props.state
  return <div className={classNames({
    "show-message": state.gameOver,
    "hide-message": !state.gameOver
  })} style={getStyle(props.size)}>
    <div>
      <div>Game Over</div>
      <div>{`Score: ${state.score}`}</div>
      <button className="button" onClick={props.startGame} style={getButtonStyle(props.size)}>
        Start new game
      </button>
    </div>
  </div>
}

export default GameOverMessage