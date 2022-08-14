import { def, lang } from "@/data/lang";

export function getEntry(entry: string) {
  const param = new URLSearchParams(window.location.search).get("lang");

  const l = Object.keys(lang).includes(param) ? param : def;

  let checking: any = null;

  const check = (useDefault = false) => {
    const path = entry.split(".");

    checking = lang[!useDefault ? l : def];

    while (path.length > 0) {
      checking = checking[path.shift()];

      if (checking === undefined) {
        if (!useDefault) {
          check(true);
        }

        break;
      }
    }
  };

  check();

  return checking;
  // return path.length === 0 ? checking : entry;
}
