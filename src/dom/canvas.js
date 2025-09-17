import { dom } from './state';

export function createCanvas() {
  const { container } = dom.state();
  const canvas = document.createElement('canvas');

  if (!container.querySelector('canvas')) {
    container.appendChild(canvas);
  }

  dom.set({ canvas });
}

export function createContext() {
  const { canvas } = dom.state();
  const ctx = canvas.getContext('2d');
  dom.set({ ctx });
}
