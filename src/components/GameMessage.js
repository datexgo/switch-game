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

const GameMessage = (props) => {
  let state = props.state
  return <div className={classNames({
    "show-message": state.gameOver,
    "hide-message": !state.gameOver
  })} style={getStyle(props.size)}>
    <div>
      <div>{state.gameOver ? "Game Over" : `Level n completed`}</div>
      <div>{`Score: ${state.score}`}</div>
      <button className="button" onClick={props.startNewGame} style={getButtonStyle(props.size)}>
        {state.gameOver ? "Start new game" : "Start next level"}
      </button>
    </div>
  </div>
}

export default GameMessage