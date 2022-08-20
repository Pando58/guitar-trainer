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
export const tritoneDisplayModes = ["aug4", "dim5", "both", "tritone"];

const settings: {
  selectedScale: select;
  displayAmount: inputNumber;
  nextNoteTimer: inputNumber;
  intervalDisplayMode: select;
  tritoneDisplayMode: select;
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
  tritoneDisplayMode: {
    value: tritoneDisplayModes[3],
    list: tritoneDisplayModes,
  },
};

export default settings;

export const {
  selectedScale,
  displayAmount,
  nextNoteTimer,
  intervalDisplayMode,
  tritoneDisplayMode,
} = settings;
