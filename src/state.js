class State {
  constructor(initialState = {}) {
    this.state = initialState;
  }
  set(obj) {
    this.state = { ...this.state, obj }
  }
  getState() {
    return this.state;
  }
}

const game = new State({
  speed: 125,
  running: false,
  interval: null,
  gameOver: false,
  paused: false,
});

const player = new State({
  score: 0,
  duration: 0,
  name: '',
});

const board = new State({
  rows: 0,
  cols: 0,
  cells: [],
  food: 0,
  player: [],
});

const dom = new State({
  container: document.body,
  canvas: null,
  ctx: null,
});

export const state = { game, player, board, dom };
