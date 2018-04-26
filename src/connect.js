import React, { Component } from 'react'
let K = require('kefir')
let R = require('ramda')

export let connect = (streamsToProps, ComponentToWrap) => {
  class Container extends Component {
    constructor(props) {
      super(props)
      this.state = {}
    }

    componentWillMount() {
      let props$ = K.combine(streamsToProps)
        .throttle(20, {leading: false})

      this.sb = props$.observe(data => {
        this.setState(data)
      })
    }

    componentWillUnmount() {
      this.sb.unsubscribe()
    }

    render() {
      return React.createElement(ComponentToWrap, R.merge(this.props, this.state), this.props.children)
    }
  }

  return Container
}