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
    this.set = this.update.bind(this);
    this.state = this.get.bind(this);
    this.passUpward();
  }
  passUpward() {
    state.set({
      [this.name]: {
        ...this._state,
        update: this.set,
      },
    });
  }
  update(value) {
    if (typeof value === 'function') {
      value = value(this._state);
    }
    this._state = { ...this._state, ...value };
    this.passUpward();
  }
  get(key) {
    if (typeof key === 'undefined') {
      return this._state;
    } else {
      return this._state[key];
    }
  }
}

export const config = new Stateful('config', {
  cellSize: 20,
  fill: '#ffffff',
  radius: 1,
});
export const getConfig = () => state.get('config');

export const game = new Stateful('game', {
  speed: 125,
  running: false,
  interval: null,
  initialized: false,
  gameOver: false,
  paused: false,
});
export const getGame = () => state.get('game');

export const player = new Stateful('player', {
  moves: [],
  score: 0,
  direction: 'north',
  duration: 0,
  snake: [],
  name: '',
});
export const getPlayer = () => state.get('player');

export const board = new Stateful('board', {
  rows: 0,
  cols: 0,
  cells: [],
  food: 0,
});
export const getBoard = () => state.get('board');

export const dom = new Stateful('dom', {
  container: document.body,
  canvas: null,
  ctx: null,
});
export const getDom = () => state.get('dom');
