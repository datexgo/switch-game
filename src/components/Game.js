import React, { Component } from 'react'
import Grid from './Grid'
import * as R from 'ramda'
import K from 'kefir'
import getNumberOfCells from '../helpers/getNumberOfCells'
import replaceAt from '../helpers/replaceAt'
import '../styles/styles.css'

class Game extends Component{
  constructor(props) {
    super(props)
    this.state = {
      cells: [],
      level: 1
    }
  }

  initCells = (numberOfCells) => {
    let cells = R.range(0, numberOfCells).map(() => {
      return {type: "off", countdown: null}
    })
    this.setState({ cells })
  }

  findOffIndexes = () => {
    let { cells } = this.state
    return cells.reduce((indexes, cell, i) => {
      return cell.type == "off" ? indexes.concat(i) : indexes
    }, [])
  }

  activateNewCell = () => {
    let { cells } = this.state
    let offIndexes = this.findOffIndexes()
    if (offIndexes.length == 0) return false
    let randomIndex =  Math.floor(Math.random() * offIndexes.length)
    this.setState({
      cells: replaceAt(cells, offIndexes[randomIndex], {type: "WAIT", countdown: 5})
    })
  }

  switchCellTo = (cell, type, sec) => {
    let { cells } = this.state
    cells.map((Cell, i) => {
      if (Cell == cell) this.setState({
        cells: replaceAt(cells, i, {type: type, countdown: sec})
      })
    })
  }

  onCellTapped = (cell) => {
    if (cell.type == "off" || cell.type == "WAIT") return
    this.switchCellTo(cell, "WAIT", 5)
  }

  componentDidMount() {
    this.initCells(getNumberOfCells(this.state.level))
    setTimeout(() => {
      this.activateNewCell()
    }, 2000)
  }

  render() {
    return <div className="game">
      <Grid state={this.state} onClick={this.onCellTapped} />
    </div>
  }

}

export default Game
