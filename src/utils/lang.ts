import type { DeepPartial } from "@/data/commonTypes";
import type { langStructure } from "@/data/languages";
import { def, langs } from "@/data/languages";

export function getEntries(
  getEntry: (
    e: DeepPartial<langStructure>
  ) => string | { [key: string]: string }
) {
  const param = new URLSearchParams(window.location.search).get("lang");
  const l = param in langs ? param : def;

  const checks = [langs[l], langs[def]];

  for (let i in checks) {
    const entry = getEntry(checks[i]);

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
  const param = new URLSearchParams(window.location.search).get("lang");

  const l = param in langs ? param : def;

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
