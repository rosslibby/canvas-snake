import { endGame } from './game';
import { getBoard, getGame, getPlayer } from './state';

export function initPlayer() {
  const { rows, cols } = getBoard();
  const midX = cols % 2 ? Math.floor(cols / 2) : cols / 2 - 1;
  const midY = rows % 2 ? Math.floor(rows / 2) : rows / 2 - 1;

  const head = [midX, midY - 1];
  const body = [midX, midY];
  const tail = [midX, midY + 1];

  getPlayer().update({
    direction: 'north',
    score: 0,
    snake: [head, body, tail],
  });
  getGame().update({ initialized: true });
  updateCellsPlayer();
}

function updateCellsPlayer() {
  const snake = getPlayer().snake.map(idxFromXY);
  const { cells, update } = getBoard();
  update({ cells: cells.map((v, i) => {
    if (v === 1 && !snake.includes(i)) {
      return 0;
    } else if (snake.includes(i)) {
      return 1;
    }
    return v;
  })})
}

export function idxFromXY([x, y]) {
  const { rows, cols } = getBoard();
  return y * cols + rows;
}

function xyFromIdx(idx) {
  const { rows, cols } = getBoard();
  return idx % rows + Math.floor(idx / cols);
}

export function moveUp() {
  const { snake, update } = getPlayer();
  update({
    snake: snake.map(([x, y]) => [x, y - 1]),
  });
}

export function move() {
  const directions = {
    north: ([x, y]) => [x, y - 1],
    south: ([x, y]) => [x, y + 1],
    east: ([x, y]) => [x + 1, y],
    west: ([x, y]) => [x - 1, y],
  };
  const { direction, moves, snake, update } = getPlayer();

  const moveDirection = moves.pop() || direction;
  const head = snake[0];
  const nextPosition = directions[moveDirection](head);

  if (!detectCollision(nextPosition)) {
    // remove tail
    snake.pop();
    snake.unshift(nextPosition);
    update({ snake });
  } else {
    endGame();
  }
}

function detectCollision([x, y]) {
  const { snake } = getPlayer();
  const { rows, cols } = getBoard();

  const eastWest = x >= cols || x < 0;
  const northSouth = y >= rows || y < 0;

  const evaluating = snake.slice(1, snake.length);

  /**
   * It's impossible for the snake's top 3 cells to collide
   */
  const self = snake.slice(1, snake.length)
    .find(([sx, sy]) => sx === x && sy === y);

  const collision = Boolean(eastWest || northSouth || self);
  return collision;
}
