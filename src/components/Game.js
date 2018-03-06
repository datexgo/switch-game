import React, { Component } from 'react'
import Grid from './Grid'
import * as R from 'ramda'
import K from 'kefir'
import getNumberOfCells from '../helpers/getNumberOfCells'
import '../styles/styles.css'

class Game extends Component{
  constructor(props) {
    super(props)
    this.id = []
    this.counter = 0
    this.state = {
      cells: [],
      level: 1
    }
  }

  initCells = (numberOfCells) => {
    let cells = R.range(0, numberOfCells).map(() => {
      return {type: "off", countdown: null, index: null}
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
    let offIndexes = this.findOffIndexes()
    if (offIndexes.length == 0) return false
    let randomIndex =  Math.floor(Math.random() * offIndexes.length)
    let newCellIndex = offIndexes[randomIndex]
    this.waitUpdate(newCellIndex)
  }

  waitUpdate = (index) => {
    let { cells } = this.state
    this.switchCellTo(cells[index], "WAIT", 5)
    let id = setInterval(() => {
      this.setState({
        cells: R.update(index, {type: "WAIT", countdown: R.dec(this.state.cells[index].countdown), index: index}, cells)
      })
      if (this.state.cells[index].countdown < 1) {
        clearInterval(id)
        this.tapUpdate(index)
      }
    }, 1000)
  }

  tapUpdate = (index) => {
    let { cells } = this.state
    this.switchCellTo(this.state.cells[index], "TAP", 3, index)
    let id = setInterval(() => {
      this.setState({
        cells: R.update(index, {type: "TAP", countdown: R.dec(this.state.cells[index].countdown), index: index}, cells)
      })
    }, 1000)
    this.id.push(id)
  }

  switchCellTo = (cell, type, sec, index) => {
    let { cells } = this.state
    cells.map((Cell, i) => {
      if (Cell == cell) this.setState({
        cells: R.update(i, {type: type, countdown: sec, index: index}, cells)
      })
    })
  }

  onCellTapped = (cell) => {
    if (cell.type == "off" || cell.type == "WAIT") return
    clearInterval(this.id[this.counter])
    this.counter++
    this.waitUpdate(cell.index)
    //setTimeout(this.activateNewCell, 1000)
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
