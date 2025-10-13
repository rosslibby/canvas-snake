import { getInnerSize } from './utils';
import { dom, state as appState } from '../state';

export function createCanvas() {
  const { container } = dom.state();
  const canvas = document.createElement('canvas');
  dom.set({ canvas });

  updateCells();
  container.appendChild(canvas);
  window.addEventListener('resize', updateCells);
}

function updateCells() {
  const state = appState.state();
  const {
    board,
    dom: { canvas, container, overlay },
    config: { cellSize },
  } = state;
  const [width, height] = getInnerSize(container);
  const useableWidth = width * .9;
  const useableHeight = height * .9;

  const cols = Math.floor(useableWidth / cellSize);
  const rows = Math.floor(useableHeight / cellSize);

  const { x, y } = canvas.getBoundingClientRect();

  canvas.setAttribute('width', cols * cellSize);
  canvas.setAttribute('height', rows * cellSize);
  overlay.style.setProperty('--width', cols * cellSize + 'px');
  overlay.style.setProperty('--height', rows * cellSize + 'px');

  const cells = Array.from({ length: rows * cols }, () => 0);
  board.update({ rows, cols, cells });
}
