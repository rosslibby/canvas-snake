import { xyFromIdx } from './player'
import { getConfig, getPlayer, getDom, getBoard } from './state'

export function render() {
  const { canvas, ctx } = getDom()
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawPlayer()
  drawFood()
}

function drawFood() {
  const { food } = getBoard() as { food: number }

  drawBlock(xyFromIdx(food), '#ffe68b')
}

function drawPlayer() {
  const { snake } = getPlayer()
  snake.map(drawBlock)
}

function drawBlock(
  [x, y]: [number, number],
  fill?: string,
) {
  const { ctx } = getDom()
  const { cellSize, fill: fillColor, radius } = getConfig()
  const size = cellSize - 2

  x = x * cellSize
  y = y * cellSize

  ctx.beginPath()
  ctx.fillStyle = fill || fillColor
  ctx.roundRect(x + 2, y + 2, size, size, radius)
  ctx.fill()
  ctx.closePath()
}
