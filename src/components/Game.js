import React, { Component } from 'react'
import Grid from './Grid'
import * as R from 'ramda'
import K from 'kefir'
import '../styles/styles.css'

class Game extends Component{
  constructor(props) {
    super(props)
    this.state = {
      cells: [],
      level: 1
    }
  }

  getNumberOfCells = () => {
    let size = this.state.level + 1
    return size * size
  }

  initCells = (numberOfCells) => {
    let cells = R.range(0, numberOfCells).map(() => {
      return {type: "off"}
    })
    this.setState({ cells })
  }

  findOffIndexes = () => {
    let { cells } = this.state
    return cells.reduce((indexes, cell, i) => {
      return cell.type == "off" ? indexes.concat(i) : indexes
    }, [])
  }

  replaceAt = (list, index, value) => {
    let start = list.slice(0, index)
    let end = list.slice(index + 1, list.length)
    return start.concat(value, end)
  }

  activateNewCell = () => {
    let { cells } = this.state
    let offIndexes = this.findOffIndexes()
    if (offIndexes.length == 0) return false
    let randomIndex =  Math.floor(Math.random() * offIndexes.length)
    this.setState({
      cells: this.replaceAt(cells, offIndexes[randomIndex], {type: "TAP", countdown: 3})
    })
  }

  switchCellTo = (cell, type) => {
    let { cells } = this.state
    cells.map((Cell, i) => {
      if (Cell == cell) this.setState({
        cells: this.replaceAt(cells, i, {type: type, countdown: 5})
      })
    })
  }

  onCellTapped = (cell) => {
    this.switchCellTo(cell, "WAIT")
  }

  componentWillMount() {
    this.initCells(this.getNumberOfCells())
  }

  componentDidMount() {
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