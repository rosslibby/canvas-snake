import { getGame } from './state';
import { render } from './render';
import { move } from './player';

export function endGame() {
  const { interval, update } = getGame();
  if (interval) {
    clearInterval(interval);
  }

  update({
    interval: null,
    running: false,
    gameOver: true,
  });
}

export function startGame() {
  const { interval, speed, update } = getGame();

  if (!interval) {
    update({
      interval: setInterval(() => {
        move();
        render();
      }, speed),
    })
  }
}
