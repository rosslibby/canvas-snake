import { state } from './state'
import { useState } from './client'

export { state, useState }

export const config = useState('config', {
  cellSize: 20,
  fill: '#ffffff',
  radius: 1,
})
export const getConfig = () => state.get('config')

export const game = useState('game', {
  speed: 125,
  running: false,
  interval: null,
  initialized: false,
  gameOver: false,
  paused: false,
})
export const getGame = () => state.get('game')

export const player = useState('player', {
  moves: [],
  score: 0,
  direction: 'north',
  duration: 0,
  snake: [],
  name: '',
})
export const getPlayer = () => state.get('player')

export const board = useState('board', {
  rows: 0,
  cols: 0,
  cells: [],
  food: -1,
})
export const getBoard = () => state.get('board')

export const dom = useState('dom', {
  container: document.body,
  canvas: null,
  ctx: null,
})
export const getDom = () => state.get('dom')
