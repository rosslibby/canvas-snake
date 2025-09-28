import { getConfig, getPlayer, getDom, getGame } from './state';
import { move } from './player';

export function render() {
  const { canvas, ctx } = getDom();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
}

function drawPlayer() {
  const { snake } = getPlayer();
  console.log(`[[draw]]`, snake)
  snake.map(drawBlock);
}

function drawBlock([x, y]) {
  const { ctx } = getDom();
  const { cellSize, fill, radius } = getConfig();
  const size = cellSize - 2;

  console.log(`Rendering ${x}:${y}...`)

  x = x * cellSize;
  y = y * cellSize;

  console.log(`Coordinates ${x} x ${y}`)

  ctx.beginPath();
  // ctx.fillStyle = fill;
  ctx.fillStyle = 'white';
  ctx.roundRect(x + 2, y + 2, size, size, radius);
  ctx.fill();
  ctx.closePath();
}
