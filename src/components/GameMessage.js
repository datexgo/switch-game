import React from 'react'
import PropTypes from 'prop-types'
const classNames = require('classnames')

const getStyle = (size) => {
  return {
    width: size,
    height: size,
    fontSize: `${Math.round(size / 8)}px`
  }
}

const GameMessage = (props) => {
  const { state, size } = props

  return <div className={classNames({
    'show-message': state.gameIsLose || state.levelComplete || state.startingMessage,
    'hide-message': !state.gameIsLose && !state.levelComplete && !state.startingMessage
  })} style={getStyle(size)}>
    <div className={'message'}>
      <div>
        {
          state.gameIsLose
            ? 'You lose'
            : state.levelComplete
              ? `Level ${state.level} complete!`
              : state.startingMessage
                ? 'How to play?'
                : null
        }

        <div>
          {
            state.gameIsLose
              ? `Score: ${state.score}`
              : state.levelComplete
                ? 'Get ready!'
                : state.startingMessage
                  ? <div className="rules">
                    <div>{'Tap a tile when it turns green.'}</div>
                    <div>{'You win when no more tile is available.'}</div>
                    <div>{"Don't miss any or the game ends!"}</div>
                  </div>
                  : null
          }
        </div>
      </div>

      <div>
        {state.gameIsLose || state.startingMessage ? 'Swipe to start new game' : 'Swipe to start next level'}
      </div>
    </div>
  </div>
}

GameMessage.propTypes = {
  state: PropTypes.object.isRequired,
  size: PropTypes.number.isRequired
}

export default GameMessage
