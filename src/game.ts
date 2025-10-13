import { getGame } from './state'
import { render } from './render'
import { initPlayer, move } from './player'
import { toggleOverlay } from './dom/overlay';

function setupInterval() {
  const { gameOver, initialized, speed, update } = getGame();

  if (gameOver || !initialized) {
    initPlayer();
  }

  update({
    interval: setInterval(() => {
      const { gameOver, interval, running, update } = getGame();
      if (running && !gameOver) {
        move();
        render();
      } else {
        clearInterval(interval);
        if (running) {
          update({ running: false });
        }
      }
    }, speed),
    running: true,
    gameOver: false,
  });
}

export function endGame() {
  const { update } = getGame()
  update({ gameOver: true, initialized: false, running: false })
}

export function startGame() {
  setupInterval();
  toggleOverlay();
}

export function togglePauseGame() {
  const { update } = getGame();
  update(({ running }: {
    running: boolean
  }) => ({ running: !running }));
  toggleOverlay();
}
