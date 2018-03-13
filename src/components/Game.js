import React, { Component } from "react"
import Grid from "./Grid"
import * as R from "@paqmind/ramda"
import K from "kefir"
import getNumberOfCells from "../helpers/getNumberOfCells"
import "../styles/styles.css"

////////////////////////////////////////////////////////////////////////////////////////////////////
R.map2 = R.addIndex(R.map)

let rand = (min, max) => min + Math.floor(Math.random() * max)

let pickRandom = (xs) => xs[rand(0, xs.length)]

let decNumber = (x) => R.is(Number, x) ? (x >= 2 ? x - 1 : null) : null
////////////////////////////////////////////////////////////////////////////////////////////////////

class Game extends Component{
  constructor(props) {
    super(props)
    this.startTimer = null
    this.tickTimer = null
    this.state = {
      cells: [], // {countdown :: Number | Null, index :: Number}
      level: 1
    }
  }

  initCells = () => {
    let numberOfCells = getNumberOfCells(this.state.level)
    let cells = R.map2((_, i) => ({
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
      this.setState({
        cells: R.map(R.over2("countdown", decNumber), cells)
      })
    }, 1000)
  }

  activateRandomCell = () => {
    let {cells} = this.state

    let offCells = R.filter(cell => cell.countdown == null, cells)
    if (offCells.length) {
      let offCell = pickRandom(offCells)

      this.setState({
        cells: R.set2([offCell.index, "countdown"], 5, cells) // TODO magic number 5
      })
    }
  }

  onCellTap = (cell) => {
    if (cell.countdown != null) {
      let {cells} = this.state
      this.setState({
        cells: R.set2([cell.index, "countdown"], null, cells) // TODO magic number 5
      }, () => {
        this.activateRandomCell()
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