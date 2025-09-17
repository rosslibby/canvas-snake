import { dom } from '../state';

export function createContainer() {
  const { container } = dom.state();
  const main = document.createElement('main');

  if (!document.querySelector('main')) {
    container.appendChild(main);
    dom.update({ container: main });
  }
}
