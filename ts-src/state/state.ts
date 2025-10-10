import { Entries } from '../types'

class State {
  private entries: Entries

  public state = this.get.bind(this)

  constructor(initialState: Entries = {}) {
    this.entries = initialState
    this.state = this.get.bind(this)
  }

  set(obj: Entries): void {
    this.entries = {
      ...this.entries,
      ...obj,
    }
  }

  get(key?: string): Entries {
    if (typeof key !== 'undefined') {
      return this.entries[key] || this.entries
    } else {
      return this.entries
    }
  }
}

export const state = new State()
