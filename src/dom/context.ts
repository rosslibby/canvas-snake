import { dom } from '../state';

export function createContext() {
  const { canvas } = dom.state();
  const ctx = canvas.getContext('2d');
  dom.set({ ctx });
}
