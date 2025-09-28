import { state } from './state';
import './dom';
import { initPlayer } from './player';
import { render, renderLoop } from './render';

function start() {
  initPlayer();
  console.log(state.get());
  render();
  // renderLoop();
}

start();
