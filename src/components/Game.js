import React, { Component } from 'react'
import Grid from './Grid'
import * as R from 'ramda'
import K from 'kefir'
import getNumberOfCells from '../helpers/getNumberOfCells'
import '../styles/styles.css'

class Game extends Component{
  constructor(props) {
    super(props)
    this.state = {
      cells: [],
      level: 1,
      countdown: new Array(100).fill(5)
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
    let newCellIndex = offIndexes[randomIndex]
    this.setState({
      cells: R.update(newCellIndex, {type: "WAIT", countdown: 5}, cells)
    })
    console.log(this.state.cells[newCellIndex].countdown)
    let timerId = setInterval(() => {
      this.setState({
        cells: R.update(newCellIndex, {type: "WAIT", countdown: R.dec(this.state.cells[newCellIndex].countdown)}, cells)
      })
    }, 1000)
  }

  onSecondElapsed = () => {

  }

  switchCellTo = (cell, type, sec) => {
    let { cells } = this.state
    cells.map((Cell, i) => {
      if (Cell == cell) this.setState({
        cells: R.update(i, {type: type, countdown: sec}, cells),
        countdown: R.update(i, sec, this.state.countdown)
      })
    })
  }

  onCellTapped = (cell) => {
    if (cell.type == "off" || cell.type == "WAIT") return
    this.switchCellTo(cell, "WAIT", 5)
    setTimeout(this.activateNewCell, 1000)
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
