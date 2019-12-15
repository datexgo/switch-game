import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { circleAnimationFrame, circleAnimationTiming } from '../utils/constants'

class ProgressBar extends Component {
  constructor (props) {
    super(props)
    this.animation = null
    this.circle = React.createRef()
  }

  animate () {
    this.animation = this.circle.current.animate(
      circleAnimationFrame,
      circleAnimationTiming
    )
  }

  componentDidUpdate (nextProps) {
    if (this.props.value !== nextProps.value) {
      this.animate()
    }
  }

  render () {
    const { label, value } = this.props

    return <div className="progress-bar">
      <div>{ label }</div>
      <div>{ value }</div>

      <div ref={this.circle}
        className="animation-circle">
      </div>
    </div>
  }
}

ProgressBar.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
}

export default ProgressBar
