import React from 'react'
import Store from '../helpers/store'
import Grid from './Grid'
import { View, Panel, PanelHeader } from '@vkontakte/vkui'

import { initialState } from '../data/initialState'
import { isGameInProgress, isLevelCompleted } from '../utils/utils'
import { connect } from '../connect'
import { pool } from '../helpers/pool'

import pickRandom from '../helpers/pickRandom'
import decNumber from '../helpers/decNumber'
import getNumberOfCells from '../helpers/getNumberOfCells'

import * as R from '@paqmind/ramda'
import * as K from 'kefir'

R.map2 = R.addIndex(R.map)

export default function () {
  let newCellTimer

  const swipe$ = K.fromEvents(document.body, 'touchmove')
    .throttle(100)
    .map(_ => function swipe (state) {
      return R.cond([
        [isLevelCompleted, R.pipe(startLevel, initCells, activateRandomCell)],
        [R.complement(isGameInProgress), R.pipe(startGame, initCells, activateRandomCell)],
        [R.T, R.always(state)]
      ])(state)
    })

  const action$ = pool()
  const ticker$ = K.interval(1000).map(_ => function tick (state) {
    const { score, best } = state

    if (gameIsLose(state)) {
      return R.merge(initCells(state), { gameIsLose: true, best: score > best ? score : best })
    } else {
      return R.over2('cells', R.map(R.pipe(switchWaitToTap, decNumber)), state)
    }
  })

  const state$ = Store(K.merge([
    K.constant(() => initialState),
    action$,
    ticker$,
    swipe$
  ]))

  // ------------------- game logic -------------------------------------

  function initCells (state) {
    const numberOfCells = getNumberOfCells(state.level)
    const cells = R.map2((_, i) => ({
      label: 'off',
      countdown: null,
      index: i
    }), R.range(0, numberOfCells))

    return {
      ...state,
      cells
    }
  }

  function startGame (state) {
    return {
      ...state,
      startingMessage: false,
      gameIsLose: false,
      gameIsPassed: false,
      score: 0,
      level: 1
    }
  }

  function startLevel (state) {
    return {
      ...state,
      levelComplete: false,
      level: R.inc(state.level)
    }
  }

  function onCellTap (cell) {
    function tapHandler (state) {
      if (cell.countdown != null && cell.label !== 'WAIT') {
        return {
          ...state,
          score: state.score + 1,
          cells: R.set2([cell.index, 'countdown'],
            5, R.set2([cell.index, 'label'], 'WAIT', state.cells))
        }
      } else {
        return state
      }
    }

    action$.plug(tapHandler)
  }

  function activateRandomCell (state) {
    let cells = state.cells
    const offCells = R.filter(cell => cell.countdown == null, cells)

    if (offCells.length) {
      const offCell = pickRandom(offCells)
      cells = R.set2([offCell.index, 'countdown'],
        5, R.set2([offCell.index, 'label'], 'WAIT', state.cells))

      newCellTimer = setTimeout(() => action$.plug(activateRandomCell), 6000)

      return {
        ...state,
        cells
      }
    } else {
      clearTimeout(newCellTimer)
      return R.merge(initCells(state), { levelComplete: true })
    }
  }

  function gameIsLose (state) {
    let loseStatus = false
    state.cells.map(cell => {
      if (cell.countdown === 1 && cell.label === 'TAP') {
        loseStatus = true
        clearTimeout(newCellTimer)
      }
    })

    return loseStatus
  }

  function switchWaitToTap (cell) {
    return cell.countdown === 1 && cell.label === 'WAIT'
      ? { label: 'TAP', countdown: 4, index: cell.index }
      : cell
  }

  // function gameIsPassed (state) {
  //   return {
  //     ...state,
  //     gameIsPassed: true
  //   }
  // }

  // function startLevelBtnHandler () {
  //   action$.plug(startLevel)
  //   action$.plug(initCells)
  //   action$.plug(activateRandomCell)
  // }

  // function startNewGameBtnHandler () {
  //   action$.plug(startGame)
  //   action$.plug(initCells)
  //   action$.plug(activateRandomCell)
  // }

  action$.plug(initCells)

  // --------------------------------------------------------------------

  const Component = connect(
    { state: state$ },
    ({ state }) => <View activePanel="main">
      <Panel id="main" theme={'white'}>
        <PanelHeader theme={'alternate'} noShadow={true}>
          Switch
        </PanelHeader>

        <div className="game">
          <div>{`Level: ${state.level} — Score: ${state.score} — Best: ${state.best}`}</div>

          <Grid state={state}
            onCellTap={onCellTap}/>
        </div>
      </Panel>
    </View>
  )

  return <Component/>
}
