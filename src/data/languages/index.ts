import type { DeepPartial } from "@/data/commonTypes";
import en from "./en.json";
import es from "./es.json";

interface select {
  label: string;
  options: { [key: string]: string };
}

type interval = {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: {
    aug4: string;
    dim5: string;
    tt: string;
  };
  7: string;
  8: string;
  9: string;
  10: string;
  11: string;
  12: string;
};

export interface langStructure {
  timer: string;
  reset: string;
  next: string;
  settings: {
    titles: {
      general: string;
      noteDetection: string;
      language: string;
    };
    scale: select;
    displayAmount: string;
    gamemode: select;
    intervalDisplayMode: select;
    tritoneDisplayMode: select;
    rootNote: string;
    language: select;
  };
  intervals: {
    full: interval;
    short: interval;
    abbreviated: interval;
  };
}

export const def = "en";

export const langs: {
  en: langStructure;
  [key: string]: DeepPartial<langStructure>;
} = {
  en,
  es,
};
