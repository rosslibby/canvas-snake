import { dom, game } from './state';

function setup() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  dom.set({ canvas, ctx });
  const { container } = dom.state();
  if (!container.querySelector('canvas')) {
    container.appendChild(canvas);
  }
}

setup();
