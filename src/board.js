import { idxFromXY } from './player';
import { getBoard, getPlayer } from './state';

export function dropFood() {
  const { cells, update } = getBoard();
  const { snake } = getPlayer();

  const snakeIndices = snake.map(idxFromXY);
  const available = cells.filter((_, i) => !snakeIndices.includes(i));
  const foodIdx = Math.floor(Math.random() * available.length);
  console.log(`New food drop:`, foodIdx);
  update({ food: foodIdx });
}
