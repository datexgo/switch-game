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
    this.newCellTimer = null
    this.state = {
      cells: [], // {label :: "off" | "WAIT" | "TAP", countdown :: Number | Null, index :: Number}
      level: 1,
      gameOver: false,
      score: 0
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

  startGame = () => {
    this.setState({
      gameOver: false,
      score: 0
    })
    this.initCells()
    this.startTimer = setTimeout(() => {
      this.activateRandomCell()
      this.runTicker()
    }, 1000) // TODO magic number
  }

  exitGame() {
    clearTimeout(this.startTimer)
    clearTimeout(this.newCellTimer)
    clearInterval(this.tickTimer)
  }

  runTicker() {
    this.tickTimer = setInterval(() => {
      let {cells} = this.state
      let updatedCells = this.waitTimeoutCheck(cells)
      this.setState({
        cells: R.map(R.over2("countdown", decNumber), updatedCells)
      })
      this.tapTimeoutCheck(cells)
    }, 1000)
  }

  tapTimeoutCheck = (cells) => {
    cells.map(cell => {
      cell.countdown == 1 && cell.label == "TAP" ? this.gameOver() : null
    })
  }

  gameOver = () => {
    this.setState({
      gameOver: true
    })
    this.exitGame()
    this.initCells()
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
          5, R.set2([offCell.index, "label"], "WAIT", cells)) // TODO magic number
      })
    }

    this.newCellTimer = setTimeout(() => {this.activateRandomCell()}, 6000)
  }

  onCellTap = (cell) => {
    if (cell.countdown != null && cell.label != "WAIT") {
      let {cells} = this.state
      this.setState({
        score: this.state.score + 1,
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
      <Grid state={this.state} onCellTap={this.onCellTap} startGame={this.startGame}/>
    </div>
  }
}

export default Game