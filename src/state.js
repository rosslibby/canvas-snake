class State {
  constructor(initialState = {}) {
    this.state = initialState;
  }
  set(obj) {
    this.state = { ...this.state, ...obj };
  }
  get() {
    return this.state;
  }
}

export const state = new State();
class Stateful {
  constructor(name, initialState = {}) {
    this.name = name;
    this.state = initialState;
    state.set({ [this.name]: this.state });
    this.set = this.update.bind(this);
  }
  update(obj) {
    this.state = { ...this.state, ...obj };
    state.set({ [this.name]: this.state });
  }
  get(key) {
    if (typeof key === 'undefined') {
      return this.state;
    } else {
      return this.state[key];
    }
  }
}

export const game = new Stateful('game', {
  speed: 125,
  running: false,
  interval: null,
  gameOver: false,
  paused: false,
});

export const player = new Stateful('player', {
  score: 0,
  duration: 0,
  snake: [],
  name: '',
});

export const board = new Stateful('board', {
  rows: 0,
  cols: 0,
  cells: [],
  food: 0,
});

export const dom = new Stateful('dom', {
  container: document.body,
  canvas: null,
  ctx: null,
});
