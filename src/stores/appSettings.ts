import { writable } from "svelte/store";
import { scaleNames } from "../data/scales";

function makeStore<T>(value: T, transform: (val: T) => T) {
  const store = writable(value);
  
  return {
    ...store,
    set: (value) => store.set(transform(value))
  }
}

export const stores = {
  selectedScale: makeStore(scaleNames[0], val => scaleNames.includes(val) ? val : scaleNames[0]),
  displayAmount: makeStore(5, val => Math.min(Math.max(val, 1), 20)),
  nextNoteTimer: makeStore(5, val => Math.min(Math.max(val, 0.1), 60))
}

export const {
  selectedScale,
  displayAmount,
  nextNoteTimer
} = stores;