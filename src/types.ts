export type Entries = Record<string, any>
export type UpdateValueFn<T = any> = (v: unknown) => T
export type UpdateValue<T = any> = T | UpdateValueFn<T>
export type UpdateFn = (v: UpdateValue) => void
export type MoveCoordinates = ([x, y]: [number, number]) => [number, number]
