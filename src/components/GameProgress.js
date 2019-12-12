import React from 'react'
import PropTypes from 'prop-types'

const GameProgress = props => {
  const { state } = props

  return <div className="game-progress">
    <div className="circle">
      <div>
        level
      </div>

      <div className="num">
        {state.level}
      </div>
    </div>

    <div className="circle">
      <div>
        score
      </div>

      <div className="num">
        {state.score}
      </div>
    </div>

    <div className="circle">
      <div>
        best
      </div>
      <div className="num">
        {state.best}
      </div>
    </div>
  </div>
}

GameProgress.propTypes = {
  state: PropTypes.object.isRequired
}

export default GameProgress
