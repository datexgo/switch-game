import React, { Component } from 'react'
import * as R from '@paqmind/ramda'
import * as K from 'kefir'

export const connect = (streamsToProps, ComponentToWrap) => {
  class Container extends Component {
    constructor (props) {
      super(props)
      this.state = {}
    }

    UNSAFE_componentWillMount () {
      const props$ = K.combine(streamsToProps)
        .throttle(20, { leading: false })

      this.sb = props$.observe(data => {
        this.setState(data)
      })
    }

    componentWillUnmount () {
      this.sb.unsubscribe()
    }

    render () {
      return React.createElement(ComponentToWrap, R.merge(this.props, this.state), this.props.children)
    }
  }

  return Container
}
