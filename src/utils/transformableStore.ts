import { writable, type Writable } from "svelte/store";

export function transformableStore<T>(value: T, transform: (val: T) => T): Writable<T> {
  const store = writable(value);
  
  return {
    ...store,
    set: (value) => store.set(transform(value))
  }
}