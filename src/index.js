import React from 'react'
import ReactDOM from 'react-dom'
import Game from './components/Game'
import connect from '@vkontakte/vk-connect'
import '@vkontakte/vkui/dist/vkui.css'
import './styles/main.scss'

connect.send("VKWebAppInit", {})

ReactDOM.render(
  <Game/>,
  document.getElementById('app')
)
