import { dom } from '../state';

export function createCanvas() {
  const { container } = dom.state();
  const canvas = document.createElement('canvas');

  if (!container.querySelector('canvas')) {
    container.appendChild(canvas);
  }

  dom.set({ canvas });
}
