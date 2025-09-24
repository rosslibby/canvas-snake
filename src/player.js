import { board, getPlayer, player } from './state';

export function initPlayer() {
  const { rows, cols } = board.state();
  const midX = cols % 2 ? Math.floor(cols / 2) : cols / 2 - 1;
  const midY = rows % 2 ? Math.floor(rows / 2) : rows / 2 - 1;

  const head = [midX, midY - 1];
  const body = [midX, midY];
  const tail = [midX, midY + 1];

  player.update({ snake: [head, body, tail] });
  console.log(`Snake built:`, [head, body, tail]);
  updateCellsPlayer();
}

function updateCellsPlayer() {
  const snake = player.state('snake').map(idxFromXY);
  console.log(`Player -> IDX:`, snake)
  const { cells } = board.state();
  board.update({ cells: cells.map((v, i) => {
    if (v === 1 && !snake.includes(i)) {
      return 0;
    } else if (snake.includes(i)) {
      return 1;
    }
    return v;
  })})
}

function idxFromXY([x, y]) {
  const { rows, cols } = board.state();
  return y * cols + rows;
}

function xyFromIdx(idx) {
  const { rows, cols } = board.state();
  return idx % rows + Math.floor(idx / cols);
}

export function moveUp() {
  const { snake, update } = getPlayer();
  update({
    snake: snake.map(([x, y]) => [x, y - 1]),
  });
}
