import { dom } from '../state';

export function createContainer() {
  const { container } = dom.state();
  const main = document.createElement('main');

  container.appendChild(main);
  dom.update({ container: main });
}
