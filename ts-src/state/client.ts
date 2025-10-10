import { Entries, UpdateValue, UpdateValueFn } from '../types'
import { state } from './state'

class Stateful {
  private id: string
  private entries: Entries

  public set = this.update.bind(this)
  public state = this.get.bind(this)

  constructor(id: string, initialState: Entries = {}) {
    this.id = id
    this.entries = initialState
    this.passUpward()
  }

  private passUpward(): void {
    state.set({
      [this.id]: { ...this.entries, update: this.set }
    })
  }

  public update<T = any>(value: UpdateValue<T>) {
    if (typeof value === 'function') {
      value = (value as UpdateValueFn)(this.entries)
    }

    this.entries = { ...this.entries, ...value }
    this.passUpward()
  }

  public get(key?: string): Entries {
    if (typeof key !== 'undefined') {
      return this.entries[key] || this.entries
    } else {
      return this.entries
    }
  }
}

export const useState = (
  id: string,
  initialState: Entries,
) => new Stateful(id, initialState)
