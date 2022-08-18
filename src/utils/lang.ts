import type { DeepPartial } from "@/data/commonTypes";
import type { langStructure } from "@/data/languages";
import { def, langs } from "@/data/languages";

export function getCurrentLang() {
  const param = new URLSearchParams(window.location.search).get("lang");
  return param in langs ? param : def;
}

export function getEntries(
  getEntry: (
    e: DeepPartial<langStructure>
  ) => string | { [key: string]: string }
) {
  const l = getCurrentLang();

  const checks = [langs[l], langs[def]];

  for (let i in checks) {
    let entry;

    try {
      entry = getEntry(checks[i]);
    } catch (err) {
      console.log(err);
      continue;
    }

    if (entry !== undefined) {
      return entry;
    }
  }

  return "?";
}

export function getEntry(getEntry: (e: DeepPartial<langStructure>) => string) {
  return <string>getEntries(getEntry);
}

export function getEntryWithString(entry: string) {
  const l = getCurrentLang();

  const checks = [langs[l], langs[def]];

  for (let i in checks) {
    const path = entry.split(".");

    let checking: any = checks[i];

    while (path.length > 0) {
      checking = checking[path.shift()];

      if (checking === undefined) {
        break;
      }
    }

    if (checking === undefined) {
      continue;
    }

    return checking;
  }

  return "?";
}
