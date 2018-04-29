import React, { Component } from "react"
import {connect} from '../connect'
import Grid from "./Grid"
import * as R from "@paqmind/ramda"
import pickRandom from '../helpers/pickRandom'
import decNumber from '../helpers/decNumber'
import getNumberOfCells from "../helpers/getNumberOfCells"
import "../styles/styles.css"
R.map2 = R.addIndex(R.map)
let K = require('kefir')

/*class Game extends Component{
  constructor(props) {
    super(props)
    this.startTimer = null
    this.tickTimer = null
    this.newCellTimer = null
    this.state = {
      cells: [], // {label :: "off" | "WAIT" | "TAP", countdown :: Number | Null, index :: Number}
      level: 1,
      levelComplete: false,
      startingMessage: true,
      gameIsLose: false,
      gamePassed: false,
      score: 0,
      best: 0
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
    })
  }

  startGame = () => {
    this.initCells()
    this.startTimer = setTimeout(() => {
      this.activateRandomCell()
      this.runTicker()
    }, 1000)
  }

  startNewGame = () => {
    this.setState({
      startingMessage: false,
      gameIsLose: false,
      gamePassed: false,
      score: 0,
      level: 1
    }, () => {
      this.startGame()
    })
  }

  startNextLevel = () => {
    this.setState({
      level: this.state.level + 1,
      levelComplete: false
    }, () => {
      this.startGame()
    })
  }

  runTicker() {
    this.tickTimer = setInterval(() => {
      let {cells} = this.state
      let updatedCells = this.switchWaitToTap(cells)
      this.setState({
        cells: R.map(R.over2("countdown", decNumber), updatedCells)
      }, () => {
        this.gameStatusChecking(cells)
      })
    }, 1000)
  }

  activateRandomCell = () => {
    let {cells} = this.state
    let offCells = R.filter(cell => cell.countdown == null, cells)

    if (offCells.length) {
      let offCell = pickRandom(offCells)

      this.setState({
        cells: R.set2([offCell.index, "countdown"],
          5, R.set2([offCell.index, "label"], "WAIT", cells))
      }, () => {
        this.newCellTimer = setTimeout(() => {this.activateRandomCell()}, 6000)
      })
    }

    else {
      this.lvlComplete()
      this.exitGame()
    }
  }

  gameStatusChecking = (cells) => {
    cells.map(cell => {
      cell.countdown == 1 && cell.label == "TAP"
        ? this.gameIsLose()
        : this.state.level > 9
          ? this.gamePassed()
          : null
    })
  }

  switchWaitToTap = (cells) => {
    return cells.map(cell => {
      return cell.countdown == 1 && cell.label == "WAIT"
        ? {label: "TAP", countdown: 4, index: cell.index}
        : cell
    })
  }

  onCellTap = (cell) => {
    if (cell.countdown != null && cell.label != "WAIT") {
      let {cells} = this.state
      this.setState({
        score: this.state.score + 1,
        cells: R.set2([cell.index, "countdown"],
          5, R.set2([cell.index, "label"], "WAIT", cells))
      })
    }
  }

  lvlComplete = () => {
    this.setState({levelComplete: true})
  }

  gamePassed = () => {
    this.setState({gamePassed: true})
  }

  gameIsLose = () => {
    let {score, best} = this.state
    this.setState({
      gameIsLose: true,
      best: best > score ? best : score
    }, () => {
      this.exitGame()
    })
  }

  exitGame() {
    clearTimeout(this.startTimer)
    clearTimeout(this.newCellTimer)
    clearInterval(this.tickTimer)
    this.initCells()
  }

  componentDidMount() {
    this.initCells()
  }


  componentWillUnmount() {
    this.exitGame()
  }

  render() {
    let {level, score, best} = this.state
    return <div className="game">
      <h1>Switch game</h1>
      <h2>{`Level: ${level} — Score: ${score} — Best: ${best}`}</h2>
      <Grid state={this.state}
            onCellTap={this.onCellTap}
            startNewGame={this.startNewGame}
            startNextLevel={this.startNextLevel}
      />
    </div>
  }
}

export default Game*/

export default () => {
  let initialState = {
    cells: [], // {label :: "off" | "WAIT" | "TAP", countdown :: Number | Null, index :: Number}
    level: 1,
    levelComplete: false,
    startingMessage: true,
    gameIsLose: false,
    gameIsPassed: false,
    score: 0,
    best: 0
  }

  function Store(action$) {
    return action$
      .scan((state, fn) => {
        if (R.is(Function, fn)) {
          return fn(state)
        } else {
          throw Error(`dispatched value must be a function, got ${typeof fn}`)
        }
      }, null)
      .skipDuplicates()
  }

  function pool() {
    let pool = K.pool()
    let _plug = pool.plug.bind(pool)
    pool.plug = function (x) {
      if (x instanceof K.Property || x instanceof K.Stream || x instanceof K.Observable) {
        _plug(x)
      } else {
        _plug(K.constant(x))
      }
    }
    return pool
  }

  let action$ = pool()

  let state$ = Store(K.merge([
    K.constant(() => initialState),
    action$
  ]))

  //------------------- game logic -------------------------------------

  function initCells() {
    let numberOfCells = getNumberOfCells(initialState.level)
    let cells = R.map2((_, i) => ({
      label: "off",
      countdown: null,
      index: i,
    }), R.range(0, numberOfCells))

    action$.plug(R.set2('cells', cells))
  }

  function activateRandomCell() {
    let cells
    state$.observe(data => cells = data.cells)
    let offCells = R.filter(cell => cell.countdown == null, cells)

    if (offCells.length) {
      let offCell = pickRandom(offCells)

      action$.plug(R.set2("cells", R.set2([offCell.index, "countdown"],
      5, R.set2([offCell.index, "label"], "WAIT", cells))))
    }

    else {
      lvlComplete()
    }
  }

  function gameStatusChecking(cells) {
    cells.map(cell => {
      cell.countdown == 1 && cell.label == "TAP"
        ? this.gameIsLose()
        : this.state.level > 9
        ? this.gameIsPassed()
        : null
    })
  }

  function switchWaitToTap(cells) {
    return cells.map(cell => {
      return cell.countdown == 1 && cell.label == "WAIT"
        ? {label: "TAP", countdown: 4, index: cell.index}
        : cell
    })
  }

  function runTicker() {
    let cells
    state$.observe(state => cells = switchWaitToTap(state.cells))
    return R.set2("cells", R.map(R.over2("countdown", decNumber), cells))
  }

  function lvlComplete() {
    action$.plug(R.set2('levelComplete', true))
  }

  function gameIsPassed() {
    action$.plug(R.set2("gameIsPassed", true))
  }

  function gameIsLose() {
    state$.observe(state => {
      state.score > state.best
        ? action$.plug(R.set2("best", state.score))
        : null
    })
    action$.plug(R.set2("gameIsLose", true))
  }

  /*============ попытка запустить и проверить роботу таймера ================*/

  initCells()
  activateRandomCell()
  K.fromPoll(1000, runTicker())
    .onValue(data => {
      action$.plug(data)
      console.log(data)
    })

  /*===========================================================================*/

  //---------------------------------------------------------------------------------

  let Component = connect(
    {state: state$},
    ({state}) => <div className="game">
      <h1>Switch game</h1>
      <h2>{`Level: ${state.level} — Score: ${state.score} — Best: ${state.best}`}</h2>
      <Grid state={state} onCellTap={(e) => console.log(e)}/>
    </div>
  )

  return <Component/>
}