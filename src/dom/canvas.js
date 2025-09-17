import { dom } from './state';

export function createCavnas() {
  const { container } = dom.state();
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!container.querySelector('canvas')) {
    container.appendChild(canvas);
  }

  dom.set({ canvas, ctx });
}
