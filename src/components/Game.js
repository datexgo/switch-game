import React, { Component } from "react"
import Grid from "./Grid"
import * as R from "@paqmind/ramda"
import K from "kefir"
import pickRandom from '../helpers/pickRandom'
import decNumber from '../helpers/decNumber'
import getNumberOfCells from "../helpers/getNumberOfCells"
import "../styles/styles.css"
R.map2 = R.addIndex(R.map)

class Game extends Component{
  constructor(props) {
    super(props)
    this.startTimer = null
    this.tickTimer = null
    this.state = {
      cells: [], // {label :: "off" | "WAIT" | "TAP", countdown :: Number | Null, index :: Number}
      level: 1,
      lastActivatedCellIndex: null
    }
  }

  initCells = () => {
    let numberOfCells = getNumberOfCells(this.state.level)
    let cells = R.map2((_, i) => ({
      label: "off",
      countdown: null,
      index: i,
    }), R.range(0, numberOfCells))

    this.setState({
      cells
      // +gameStarted: true
    })
  }

  startGame() {
    this.initCells()
    this.startTimer = setTimeout(() => {
      this.activateRandomCell()
      this.runTicker()
    }, 1000) // TODO magic number
  }

  exitGame() {
    clearInterval(this.startTimer)
    clearInterval(this.tickTimer)
  }

  runTicker() {
    this.tickTimer = setInterval(() => {
      let {cells} = this.state
      let updatedCells = this.waitTimeoutCheck(cells)
      this.setState({
        cells: R.map(R.over2("countdown", decNumber), updatedCells)
      })
    }, 1000)
  }

  waitTimeoutCheck = (cells) => {
    return cells.map(cell => {
      return cell.countdown == 1 && cell.label == "WAIT"
        ? {label: "TAP", countdown: 4, index: cell.index}
        : cell
    })
  }

  activateRandomCell = () => {
    let {cells} = this.state

    let offCells = R.filter(cell => cell.countdown == null, cells)
    if (offCells.length) {
      let offCell = pickRandom(offCells)

      this.setState({
        cells: R.set2([offCell.index, "countdown"],
          5, R.set2([offCell.index, "label"], "WAIT", cells)), // TODO magic number 5
        lastActivatedCellIndex: offCell.index
      })
    }

    setTimeout(() => {this.activateRandomCell()}, 6000)
  }

  onCellTap = (cell) => {
    if (cell.countdown != null && cell.label != "WAIT") {
      let {cells} = this.state
      this.setState({
        cells: R.set2([cell.index, "countdown"],
          5, R.set2([cell.index, "label"], "WAIT", cells)) // TODO magic number 5
      })
    }
  }

  componentDidMount() {
    this.startGame()
  }

  componentWillUnmount() {
    this.exitGame()
  }

  render() {
    return <div className="game">
      <Grid state={this.state} onCellTap={this.onCellTap}/>
    </div>
  }
}

export default Game