import { getGame, getPlayer } from './state';
import { startGame, togglePauseGame } from './game';

const directions = {
  ArrowUp: 'north',
  ArrowDown: 'south',
  ArrowLeft: 'west',
  ArrowRight: 'east',
};
const validKeys = {
  north: ['ArrowLeft', 'ArrowRight'],
  south: ['ArrowLeft', 'ArrowRight'],
  east: ['ArrowUp', 'ArrowDown'],
  west: ['ArrowUp', 'ArrowDown'],
};
// const startKeys = [' ', 'Enter', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
const startKeys = [' ', 'Enter'];
function handleKeyboard(e) {
  const { running } = getGame();

  if (!running) {
    if (startKeys.includes(e.key)) {
      startGame();
    }
  } else if (e.key === 'Escape') {
    togglePauseGame();
  }

  handleDirections(e);
}

function handleDirections(e) {
  const { running } = getGame();
  const { direction, update: updatePlayer } = getPlayer();

  if (running) {
    /**
     * a player moving along Y-axis may change
     * direction only to X-axis
     * 
     * a player moving along X-axis may change
     * direction only to Y-axis
     */
    if (e.key.startsWith('Arrow')) {
      const arrow = e.key;
      const valid = validKeys[direction];
      if (valid.includes(arrow)) {
        updatePlayer(({ moves }) => ({
          moves: [directions[arrow], ...moves],
          direction: directions[arrow],
        }));
        // updatePlayer({ direction: directions[arrow] });
      }
    }
  }
}

document.addEventListener('keydown', handleKeyboard);
