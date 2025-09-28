import { getConfig, getControls, getPlayer, getDom } from './state';

export function render() {
  const { canvas, ctx } = getDom();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();

  getControls().update({ lastRender: Date.now() });
}

function drawPlayer() {
  const { snake } = getPlayer();
  snake.map(drawBlock);
}

function drawBlock([x, y]) {
  const { ctx } = getDom();
  const { cellSize, fill, radius } = getConfig();
  const size = cellSize - 2;

  x = x * cellSize;
  y = y * cellSize;

  ctx.beginPath();
  ctx.fillStyle = fill;
  ctx.roundRect(x + 2, y + 2, size, size, radius);
  ctx.fill();
  ctx.closePath();
}
