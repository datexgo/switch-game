import React from 'react'
import PropTypes from 'prop-types'
let classNames = require('classnames')

let getStyle = (size) => {
  return {
    width: size,
    height: size,
    fontSize: `${Math.round(size / 8)}px`
  }
}

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
    "show-message": state.gameOver || state.levelComplete || state.startingMessage,
    "hide-message": !state.gameOver && !state.levelComplete && !state.startingMessage
  })} style={getStyle(props.size)}>
    <div>
      <div>
        {
          state.gameOver
            ? "You lose"
            : state.levelComplete
              ? `Level ${state.level} complete!`
              : state.startingMessage
                ? "How to play?"
                : null
        }
      </div>
      <div>
        {
          state.gameOver
            ? `Score: ${state.score}`
            : state.levelComplete
              ? "Get ready!"
              : state.startingMessage
                ? <div className="rules">
                    <div>Tap a tile when it turns green.</div>
                    <div>You win when no more tile is available.</div>
                    <div>Don't miss any or the game ends!</div>
                  </div>
                : null
        }
      </div>
      <button className="button"
              onClick={state.gameOver || state.startingMessage ? props.startNewGame : props.startNextLevel}
              style={getButtonStyle(props.size)}>
        {state.gameOver || state.startingMessage ? "Start new game" : "Start next level"}
      </button>
    </div>
  </div>
}

GameMessage.propTypes = {
  startNewGame: PropTypes.func.isRequired,
  startNextLevel: PropTypes.func.isRequired
}

export default GameMessage