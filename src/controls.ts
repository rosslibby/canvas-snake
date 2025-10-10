import { getGame, getPlayer } from './state';
import { startGame, togglePauseGame } from './game';
import { UpdateFn } from 'types';

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

const startKeys = [' ', 'Enter'];
function handleKeyboard(e: KeyboardEvent) {
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

function handleDirections(e: KeyboardEvent) {
  const { running } = getGame();
  const { direction, update: updatePlayer } = getPlayer() as {
    direction: keyof typeof validKeys
    update: UpdateFn
  };

  if (running) {
    /**
     * a player moving along Y-axis may change
     * direction only to X-axis
     * 
     * a player moving along X-axis may change
     * direction only to Y-axis
     */
    if (e.key.startsWith('Arrow')) {
      const arrow = e.key as keyof typeof directions;
      const valid = validKeys[direction];
      if (valid.includes(arrow)) {
        updatePlayer(({ moves }: { moves: string[] }) => ({
          moves: [directions[arrow], ...moves],
          direction: directions[arrow],
        }));
      }
    }
  }
}

document.addEventListener('keydown', handleKeyboard);
