import { select, inputNumber } from "../utils/storeTransforms";
import { transformableStore } from "../utils/transformableStore";
import { scaleNames } from "../data/scales";

export const stores = {
  selectedScale: transformableStore(scaleNames[0], val => select(val, scaleNames)),
  displayAmount: transformableStore(5, val => inputNumber(val, 1, 20)),
  nextNoteTimer: transformableStore(5, val => inputNumber(val, 0.1, 60))
}

export const {
  selectedScale,
  displayAmount,
  nextNoteTimer
} = stores;