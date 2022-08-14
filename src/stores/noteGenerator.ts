import { writable, derived, get } from "svelte/store";
import { scaleNames, scales } from "@/data/scales";

export const noteGenerator = (() => {
  let displayAmount = 5;
  let selectedScale = scales.major;

  const drawBag: number[] = [];
  const nextNotes = writable([]);

  fillNextNotes();

  function fillNextNotes() {
    while (get(nextNotes).length < displayAmount) {
      nextNotes.update((i) => i.concat(pullFromBag()));
    }
  }

  function pullFromBag() {
    if (drawBag.length <= 1) {
      drawBag.push(
        ...selectedScale
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value)
      );
    }

    return drawBag.pop();
  }

  function reset() {
    drawBag.length = 0;
    nextNotes.set([]);

    fillNextNotes();
  }

  return {
    nextNotes: derived(nextNotes, ($nextNotes) => $nextNotes),
    selectScale(scale: string) {
      if (scaleNames.includes(scale)) {
        selectedScale = scales[scale];
      }

      reset();
    },
    setDisplayAmount(amount: number) {
      displayAmount = amount;
      reset();
    },
    pullNote() {
      nextNotes.update((i) => i.slice(1, i.length));
      fillNextNotes();
    },
    reset() {
      reset();
    },
  };
})();

export const { nextNotes } = noteGenerator;
