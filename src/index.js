import { state } from './state';
import './dom';
import { initPlayer } from './player';
import { renderLoop } from './render';

function start() {
  initPlayer();
  console.log(state.get());
  renderLoop();
}

start();
