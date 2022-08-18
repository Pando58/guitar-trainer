import type { DeepPartial } from "@/data/commonTypes";
import en from "./en.json";
import es from "./es.json";

interface select {
  label: string;
  options: { [key: string]: string };
}

export interface langStructure {
  timer: string;
  reset: string;
  next: string;
  settings: {
    titles: {
      general: string;
      language: string;
    };
    scale: select;
    displayAmount: string;
    intervalDisplayMode: select;
    language: select;
  };
  intervals: {
    full: string[];
    short: string[];
    abbreviated: string[];
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
