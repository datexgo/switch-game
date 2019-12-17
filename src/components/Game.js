import React from 'react'
import Store from '../helpers/store'
import Grid from './Grid'
import ProgressBar from './ProgressBar'
import { View, Panel, PanelHeader } from '@vkontakte/vkui'
import connect from '@vkontakte/vk-connect'

import { initialState } from '../data/initialState'
import { isGameInProgress, isLevelCompleted, getBestScoreFromVkStorage } from '../utils/utils'
import { connect as attach } from '../connect'
import { pool } from '../helpers/pool'

import pickRandom from '../helpers/pickRandom'
import decNumber from '../helpers/decNumber'
import getNumberOfCells from '../helpers/getNumberOfCells'

import * as R from '@paqmind/ramda'
import * as K from 'kefir'

R.map2 = R.addIndex(R.map)

export default function () {
  let newCellTimer = null

  const action$ = pool()

  const storage$ = K.fromPromise(
    connect.sendPromise('VKWebAppStorageGet', {
      keys: ['switchBest']
    })
  )

  storage$.onValue(result => {
    action$.plug(state => {
      return R.set2('best', getBestScoreFromVkStorage(result), state)
    })
  })

  const swipe$ = K.fromEvents(document.body, 'touchmove')
    .throttle(100)
    .map(_ => function swipe (state) {
      return R.cond([
        [isLevelCompleted, activateNextLevel],
        [R.complement(isGameInProgress), beginNewGame],
        [R.T, R.always(state)]
      ])(state)
    })

  const ticker$ = K.interval(1000).map(_ => function tick (state) {
    return R.ifElse(
      timeOut,
      interruptGame,
      updateCells
    )(state)
  })

  const state$ = Store(K.merge([
    K.constant(() => initialState),
    action$,
    ticker$,
    swipe$
  ]))

  // ------------------- game logic -------------------------------------

  const beginNewGame = state => {
    return R.pipe(
      startGame,
      initCells,
      activateRandomCell
    )(state)
  }

  const interruptGame = state => {
    const { score, best } = state
    const bestScore = R.max(score, best)

    connect.send('VKWebAppStorageSet', {
      key: 'switchBest',
      value: String(bestScore)
    })

    return R.pipe(
      initCells,
      R.assoc('gameIsLose', R.T),
      R.assoc('best', bestScore)
    )(state)
  }

  const activateNextLevel = state => {
    return R.pipe(
      startLevel,
      initCells,
      activateRandomCell
    )(state)
  }

  const updateCells = state => {
    return R.over2(
      'cells',
      R.map(R.pipe(switchWaitToTap, decNumber))
    )(state)
  }

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

      cells = R.pipe(
        R.set2([offCell.index, 'countdown'], 5),
        R.set2([offCell.index, 'label'], 'WAIT')
      )(state.cells)

      clearTimeout(newCellTimer)
      newCellTimer = setTimeout(() => {
        action$.plug(activateRandomCell)
      }, 6000)

      return R.set2('cells', cells, state)
    } else {
      clearTimeout(newCellTimer)

      return R.pipe(
        initCells,
        R.assoc('levelComplete', R.T())
      )(state)
    }
  }

  function timeOut (state) {
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

  const Component = attach(
    { state: state$ },
    ({ state }) => <View activePanel="main">
      <Panel id="main" theme={'white'}>
        <PanelHeader theme={'alternate'} noShadow={true}>
          Switch
        </PanelHeader>

        <div className="game">
          <div className="game-progress">
            <ProgressBar label={'Level'}
              value={state.level} />

            <ProgressBar label={'Score'}
              value={state.score} />

            <ProgressBar label={'Best'}
              value={state.best} />
          </div>

          <Grid state={state}
            onCellTap={onCellTap}/>
        </div>
      </Panel>
    </View>
  )

  return <Component/>
}
