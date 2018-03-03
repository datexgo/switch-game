import React, { Component } from 'react'
import Grid from './Grid'
import '../styles/styles.css'

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      level: 3,
      size: 200,
      label: "WAIT",
      countdown: "5",
      color: "#fff"
    }
  }

  render() {
    return <div className="game">
      <Grid state={this.state} />
    </div>
  }

}

export default Game