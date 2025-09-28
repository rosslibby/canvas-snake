import './state';
import './controls';
import './dom';
import { initPlayer } from './player';
import { render } from './render';

function start() {
  initPlayer();
  render();
}

start();
