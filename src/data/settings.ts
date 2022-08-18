import { scales } from "@/data/scales";

interface select {
  value: string;
  list: string[];
}

interface inputNumber {
  value: number;
  min: number;
  max: number;
  step: number;
}

export type setting = select | inputNumber;

export const scaleNames = Object.keys(scales);
export const intervalDisplayModes = ["full", "short", "abbreviated"];

const settings: {
  selectedScale: select;
  displayAmount: inputNumber;
  nextNoteTimer: inputNumber;
  intervalDisplayMode: select;
} = {
  selectedScale: {
    value: scaleNames[0],
    list: scaleNames,
  },
  displayAmount: {
    value: 5,
    min: 1,
    max: 20,
    step: 1,
  },
  nextNoteTimer: {
    value: 5,
    min: 0.1,
    max: 60,
    step: 0.1,
  },
  intervalDisplayMode: {
    value: intervalDisplayModes[2],
    list: intervalDisplayModes,
  },
};

export default settings;

export const {
  selectedScale,
  displayAmount,
  nextNoteTimer,
  intervalDisplayMode,
} = settings;
