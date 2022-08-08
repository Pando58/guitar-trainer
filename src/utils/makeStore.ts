import { writable } from "svelte/store";

export function makeStore<T>(value: T, transform: (val: T) => T) {
  const store = writable(value);
  
  return {
    ...store,
    set: (value) => store.set(transform(value))
  }
}