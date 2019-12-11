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
    "show-message": state.gameIsLose || state.levelComplete || state.startingMessage,
    "hide-message": !state.gameIsLose && !state.levelComplete && !state.startingMessage
  })} style={getStyle(props.size)}>
    <div>
      <div>
        {
          state.gameIsLose
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
          state.gameIsLose
            ? `Score: ${state.score}`
            : state.levelComplete
              ? "Get ready!"
              : state.startingMessage
                ? <div className="rules">
                    <div>{"Tap a tile when it turns green."}</div>
                    <div>{"You win when no more tile is available."}</div>
                    <div>{"Don't miss any or the game ends!"}</div>
                  </div>
                : null
        }
      </div>

      <div>
        {state.gameIsLose || state.startingMessage ? "Swipe to start new game" : "Swipe to start next level"}
      </div>
    </div>
  </div>
}

export default GameMessage