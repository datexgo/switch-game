import React from 'react'
import ReactDOM from 'react-dom'
import Game from './components/Game'
import '@vkontakte/vkui/dist/vkui.css'
import './styles/main.scss'

document.cookie = 'SameSite=Strict'

ReactDOM.render(
  <Game/>,
  document.getElementById('app')
)
