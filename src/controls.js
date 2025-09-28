import { getControls, getGame, getPlayer } from './state';
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
  const { running, speed } = getGame();
  const { direction, update: updatePlayer } = getPlayer();

  if (!running) {
    if (startKeys.includes(e.key)) {
      startGame();
    }
  }

  /**
   * a player moving along Y-axis may change
   * direction only to X-axis
   * 
   * a player moving along X-axis may change
   * direction only to Y-axis
   */
  if (e.key.startsWith('Arrow')) {
    const { update: updateControls } = getControls();
    const arrow = e.key;
    const valid = validKeys[direction];
    if (valid.includes(arrow)) {
      const wait = findWaitTime();

      updateControls({ lastMove: Date.now() });

      setTimeout(() => {
        updatePlayer({ direction: directions[arrow] });
      }, wait);
    }
  } else if (e.key === 'Escape') {
    togglePauseGame();
  }
}

document.addEventListener('keydown', handleKeyboard);

function findWaitTime() {
  const { speed } = getGame();
  const { lastMove, lastRender } = getControls();

  if (lastMove <= lastRender) {
    // safe to proceed
    return 0;
  } else if (Date.now() >= lastMove + speed) {
    // safe to proceed
    return 0;
  } else {
    return Date.now() - lastMove + speed;
  }
}
