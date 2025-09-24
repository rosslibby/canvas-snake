import { getInnerSize } from './utils';
import { dom, state as appState } from '../state';

export function createCanvas() {
  const { container } = dom.state();
  const canvas = document.createElement('canvas');

  dom.set({ canvas });

  if (!container.querySelector('canvas')) {
    updateCells();
    container.appendChild(canvas);
  }

  window.addEventListener('resize', updateCells);
}

function updateCells() {
  const state = appState.state();
  const { board, dom: { canvas, container }, config: { cellSize } } = state;
  const [width, height] = getInnerSize(container);
  const useableWidth = width * .9;
  const useableHeight = height * .9;

  const cols = Math.floor(useableWidth / cellSize);
  const rows = Math.floor(useableHeight / cellSize);

  canvas.setAttribute('width', cols * cellSize);
  canvas.setAttribute('height', rows * cellSize);

  const cells = Array.from({ length: rows * cols }, () => 0);
  board.update({ rows, cols, cells });
}
