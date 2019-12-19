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
            ? <div className={'rules-header'}>Попробуй снова</div>
            : state.levelComplete
              ? <div className={'rules-header'}>Уровень { state.level } пройден</div>
              : state.startingMessage
                ? <div className={'rules-header'}>Правила</div>
                : null
        }

        <div>
          {
            state.gameIsLose
              ? `Счет: ${state.score}`
              : state.levelComplete
                ? <div className={'get-ready'}>Приготовься!</div>
                : state.startingMessage
                  ? <div className="rules">
                    <div>{'Жми на бирюзовые ячейки.'}</div>
                    <div>{'Уровень завершится, когда не останется свободных клеток.'}</div>
                    <div>{'Не упусти ни одной!'}</div>
                  </div>
                  : null
          }
        </div>
      </div>

      <div className={'swipe'}>
        <div className={'swipe-header'}>
          Свайпни
        </div>

        <div className={'swipe-tip'}>
          {state.gameIsLose || state.startingMessage
            ? 'и играй'
            : 'и продолжи'
          }
        </div>
      </div>
    </div>
  </div>
}

GameMessage.propTypes = {
  state: PropTypes.object.isRequired,
  size: PropTypes.number.isRequired
}

export default GameMessage
