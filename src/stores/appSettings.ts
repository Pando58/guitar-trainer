import { get, type Writable } from "svelte/store";
import { select, inputNumber } from "@/utils/storeTransforms";
import { transformableStore } from "@/utils/transformableStore";
import { scaleNames } from "@/data/scales";
import { intervalDisplayModes } from "@/data/appSettingsData";

export const stores: { [key: string]: Writable<any> } = {
  selectedScale: transformableStore(scaleNames[0], (val) =>
    select(val, scaleNames)
  ),
  displayAmount: transformableStore(5, (val) => inputNumber(val, 1, 20)),
  nextNoteTimer: transformableStore(5, (val) => inputNumber(val, 0.1, 60)),
  intervalDisplayMode: transformableStore(intervalDisplayModes[0], (val) =>
    select(val, intervalDisplayModes)
  ),
};

export const {
  selectedScale,
  displayAmount,
  nextNoteTimer,
  intervalDisplayMode,
} = stores;

export function updateInput({ detail }: CustomEvent) {
  const { input, value, update } = detail;

  stores[input].set(value);
  update(get(stores[input]));
}
