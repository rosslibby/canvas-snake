import { UpdateFn } from 'types'
import { idxFromXY } from './player'
import { getBoard, getPlayer } from './state'

export function dropFood() {
  const { cells, update } = getBoard() as {
    cells: number[]
    update: UpdateFn
  }
  const { snake } = getPlayer()

  const snakeIndices = snake.map(idxFromXY)
  const available = cells.filter(
    (_, i) => !snakeIndices.includes(i)
  )
  const foodIdx = Math.floor(Math.random() * available.length)
  update({ food: foodIdx })
}
