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
    "show-message": state.gameOver || state.levelComplete,
    "hide-message": !state.gameOver && !state.levelComplete
  })} style={getStyle(props.size)}>
    <div>
      <div>
        {
          state.gameOver
            ? "Game Over"
            : state.levelComplete
              ? `Level ${state.level} complete!`
              : null
        }
      </div>
      <div>{`Score: ${state.score}`}</div>
      <button className="button" onClick={state.gameOver ? props.startNewGame : props.startNextLevel} style={getButtonStyle(props.size)}>
        {state.gameOver ? "Start new game" : "Start next level"}
      </button>
    </div>
  </div>
}

export default GameMessage