import { get, type Writable } from "svelte/store";
import { select, inputNumber } from "@/utils/storeTransforms";
import { transformableStore } from "@/utils/transformableStore";
import settings from "@/data/settings";
import type { setting } from "@/data/settings";

function createStore(s: setting) {
  const f =
    "list" in s
      ? (v: string) => select(v, s.list)
      : (v: number) => inputNumber(v, s.min, s.max);

  return transformableStore(s.value, f);
}

export const stores: { [key: string]: Writable<any> } = {
  selectedScale: createStore(settings.selectedScale),
  displayAmount: createStore(settings.displayAmount),
  nextNoteTimer: createStore(settings.nextNoteTimer),
  intervalDisplayMode: createStore(settings.intervalDisplayMode),
  tritoneDisplayMode: createStore(settings.tritoneDisplayMode),
};

export const {
  selectedScale,
  displayAmount,
  nextNoteTimer,
  intervalDisplayMode,
  tritoneDisplayMode,
} = stores;

export function updateInput({ detail }: CustomEvent) {
  const { input, value, update } = detail;

  stores[input].set(value);
  update(get(stores[input]));
}
