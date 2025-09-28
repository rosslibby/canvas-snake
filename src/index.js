import './state';
import './controls';
import './dom';
import { initPlayer } from './player';
import { render, renderLoop } from './render';
import { startGame } from './game';

function start() {
  initPlayer();
  // console.log(state.get());
  render();
  // renderLoop();
}

start();
