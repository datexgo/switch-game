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
  let ticker$ = K.interval(1000).map(_ => function tick(state) {
    let {score, best} = state

    if (gameIsLose(state)) {
      return R.merge(initCells(state), {gameIsLose: true, best: score > best ? score: best})
    } else {
      return R.over2("cells", R.map(R.pipe(switchWaitToTap, decNumber)), state)
    }
  })

  let state$ = Store(K.merge([
    K.constant(() => initialState),
    action$,
    ticker$
  ]))

  //------------------- game logic -------------------------------------

  function initCells(state) {
    let numberOfCells = getNumberOfCells(state.level)
    let cells = R.map2((_, i) => ({
      label: "off",
      countdown: null,
      index: i,
    }), R.range(0, numberOfCells))

    return {
      ...state,
      cells
    }
  }

  function startGame(state) {
    return {
      ...state,
      startingMessage: false,
      gameIsLose: false,
      gameIsPassed: false,
      score: 0,
      level: 1
    }
  }

  function startNewGameBtnHandler() {
    action$.plug(initCells)
    action$.plug(startGame)
    action$.plug(activateRandomCell)
  }

  function onCellTap(cell) {  //K.fromEvent............................
    function tapHandler(state) {
      if (cell.countdown != null && cell.label != "WAIT") {
        return {
          ...state,
          score: state.score + 1,
          cells: R.set2([cell.index, "countdown"],
            5, R.set2([cell.index, "label"], "WAIT", state.cells))
        }
      } else {
        return state
      }
    }

    action$.plug(tapHandler)
  }

  function activateRandomCell(state) {
    let cells = state.cells
    let offCells = R.filter(cell => cell.countdown == null, cells)

    if (offCells.length) {
      let offCell = pickRandom(offCells)
      cells = R.set2([offCell.index, "countdown"],
        5, R.set2([offCell.index, "label"], "WAIT", state.cells))

      return {
        ...state,
        cells
      }
    }

    else {
      return {
        ...state,
        levelComplete: true
      }
    }
  }

  function gameIsLose(state) {
    let x = false
    state.cells.map(cell => {
      if (cell. countdown == 1 && cell.label == "TAP") {
        x = true
      }
    })

    return x
  }

  function switchWaitToTap(cell) {
    return cell.countdown == 1 && cell.label == "WAIT"
      ? {label: "TAP", countdown: 4, index: cell.index}
      : cell
  }

  function gameIsPassed(state) {
    return {
      ...state,
      gameIsPassed: true
    }
  }

  /*============ попытка запустить и проверить роботу таймера ================*/

  action$.plug(initCells)


  /*===========================================================================*/

  //---------------------------------------------------------------------------------

  let Component = connect(
    {state: state$},
    ({state}) => <div className="game">
      <h1>Switch game</h1>
      <h2>{`Level: ${state.level} — Score: ${state.score} — Best: ${state.best}`}</h2>
      <Grid startNewGame={startNewGameBtnHandler} state={state} onCellTap={onCellTap}/>
    </div>
  )

  return <Component/>
}