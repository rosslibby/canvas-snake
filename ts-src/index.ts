import './state';
import './controls';
import './dom';
import { initPlayer } from './player';
import { render } from './render';
import { dropFood } from './board';

function start() {
  initPlayer();
  render();
  dropFood();
}

start();
