class State {
  constructor(initialState = {}) {
    this._state = initialState;
    this.state = this.get.bind(this);
  }
  set(obj) {
    this._state = { ...this._state, ...obj };
  }
  get(key) {
    return this._state[key] || this._state;
  }
}

export const state = new State();
class Stateful {
  constructor(name, initialState = {}) {
    this.name = name;
    this._state = initialState;
    state.set({ [this.name]: this._state });
    this.set = this.update.bind(this);
    this.state = this.get.bind(this);
  }
  update(value) {
    if (typeof value === 'function') {
      value = value(this._state);
    }
    this._state = { ...this._state, ...value };
    state.set({ [this.name]: this._state });
  }
  get(key) {
    if (typeof key === 'undefined') {
      return this._state;
    } else {
      return this._state[key];
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
