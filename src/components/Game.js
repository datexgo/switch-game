import React, { Component } from "react"
import {connect} from '../connect'
import Store from '../helpers/store'
import initialState from '../data/initialState'
import pool from '../helpers/pool'
import Grid from "./Grid"
import * as R from "@paqmind/ramda"
import pickRandom from '../helpers/pickRandom'
import decNumber from '../helpers/decNumber'
import getNumberOfCells from "../helpers/getNumberOfCells"
R.map2 = R.addIndex(R.map)
let K = require('kefir')

export default function() {

  let newCellTimer

  let action$ = pool()
  let ticker$ = K.interval(1000).map(_ => function tick(state) {
    let {score, best} = state

    if (gameIsLose(state)) {
      return R.merge(initCells(state), {gameIsLose: true, best: score > best ? score : best})
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

  function startLevel(state) {
    return {
      ...state,
      levelComplete: false,
      level: R.inc(state.level)
    }
  }

  function onCellTap(cell) {
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

      newCellTimer = setTimeout(() => action$.plug(activateRandomCell), 6000)

      return {
        ...state,
        cells
      }
    }

    else {
      clearTimeout(newCellTimer)
      return R.merge(initCells(state), {levelComplete: true})
    }
  }

  function gameIsLose(state) {
    let loseStatus = false
    state.cells.map(cell => {
      if (cell. countdown == 1 && cell.label == "TAP") {
        loseStatus = true
        clearTimeout(newCellTimer)
      }
    })

    return loseStatus
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

  function startLevelBtnHandler() {
    action$.plug(startLevel)
    action$.plug(initCells)
    action$.plug(activateRandomCell)
  }

  function startNewGameBtnHandler() {
    action$.plug(startGame)
    action$.plug(initCells)
    action$.plug(activateRandomCell)
  }

  action$.plug(initCells)

  //--------------------------------------------------------------------

  let Component = connect(
    {state: state$},
    ({state}) => <div className="game">
      <div>{`Level: ${state.level} — Score: ${state.score} — Best: ${state.best}`}</div>
      <Grid startNewGame={startNewGameBtnHandler}
            startNextLevel={startLevelBtnHandler}
            state={state}
            onCellTap={onCellTap}/>
    </div>
  )

  return <Component/>
}