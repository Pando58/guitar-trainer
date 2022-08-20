import { writable, type Writable } from "svelte/store";
import { writable as writableLocalStorage } from "svelte-local-storage-store";

export function transformableStore<T>(
  value: T,
  transform: (val: T) => T,
  key?: string
): Writable<T> {
  const store = key ? writableLocalStorage(key, value) : writable(value);

  return {
    ...store,
    set: (value) => store.set(transform(value)),
  };
}
