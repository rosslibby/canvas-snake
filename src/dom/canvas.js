import { getInnerSize } from './utils';
import { dom } from '../state';

export function createCanvas() {
  const { container } = dom.state();
  const canvas = document.createElement('canvas');

  dom.set({ canvas });

  if (!container.querySelector('canvas')) {
    setCanvasDimensions();
    container.appendChild(canvas);
  }

  window.addEventListener('resize', setCanvasDimensions);
}

function setCanvasDimensions() {
  const { container, canvas } = dom.state();
  const [width, height] = getInnerSize(container);
  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);
}
