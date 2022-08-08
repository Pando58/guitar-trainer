import { select, inputNumber } from "../utils/storeTransforms";
import { makeStore } from "../utils/makeStore";
import { scaleNames } from "../data/scales";

export const stores = {
  selectedScale: makeStore(scaleNames[0], val => select(val, scaleNames)),
  displayAmount: makeStore(5, val => inputNumber(val, 1, 20)),
  nextNoteTimer: makeStore(5, val => inputNumber(val, 0.1, 60))
}

export const {
  selectedScale,
  displayAmount,
  nextNoteTimer
} = stores;