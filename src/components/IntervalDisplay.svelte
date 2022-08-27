<script lang="ts">
  import { crossfade, type CrossfadeParams } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { flip } from "svelte/animate";
  import { nextNotes } from "@/stores/noteGenerator";
  import {
    nextNoteTimer,
    intervalDisplayMode,
    tritoneDisplayMode,
  } from "@/stores/settingsStore";
  import { counter } from "@/stores/displayCounter";
  import { getEntryWithString } from "@/utils/lang";

  export let counterLimit: number;

  $: transitionDuration = {
    duration: Math.min(400, $nextNoteTimer * 1000 - 25),
  };

  function getCounterId(n: number) {
    return n - Math.floor(n / counterLimit) * counterLimit;
  }

  function getNextInterval(
    interval: number,
    intervalDisplayMode: string,
    tritoneDisplayMode: string
  ) {
    if (interval === 6) {
      if (tritoneDisplayMode === "tritone") {
        return getEntryWithString(`intervals.${intervalDisplayMode}.6.tt`);
      }

      const aug4 = getEntryWithString(
        `intervals.${intervalDisplayMode}.6.aug4`
      );
      const dim5 = getEntryWithString(
        `intervals.${intervalDisplayMode}.6.dim5`
      );

      if (tritoneDisplayMode === "both") {
        return `${aug4} / ${dim5}`;
      }

      return tritoneDisplayMode === "aug4" ? aug4 : dim5;
    }

    return getEntryWithString(`intervals.${intervalDisplayMode}.${interval}`);
  }

  const [send, receive] = crossfade({
    fallback: (node, { key }: CrossfadeParams & { key: any }) => {
      const style = getComputedStyle(node);
      const transform = style.transform === "none" ? "" : style.transform;

      return {
        duration: transitionDuration.duration,
        easing: cubicOut,
        css: (t, u) => `
          transform: ${transform} ${
          key === "in" ? `translateY(${u * 60}px)` : `scale(${t})`
        };
          opacity: ${t}
        `,
      };
    },
  });
</script>

<div class="w-full flex flex-col items-center pt-20 pb-10">
  {#each $nextNotes as next, i (getCounterId(i + $counter))}
    <div
      class={`flex items-center min-h-[3rem] xs:min-h-[4rem] ${
        i === 0 ? "text-gray-50" : "text-gray-400"
      }`}
      style={(() => {
        const l = getNextInterval(
          next,
          $intervalDisplayMode,
          $tritoneDisplayMode
        ).length;

        const a = i === 0 ? 3.75 : 2.25;
        const b =
          (1 / l) *
          (document.documentElement.clientWidth / (i === 0 ? 10 : 16));
        const size = a < b ? a : b;

        return `font-size: ${size}rem`;
      })()}
      in:receive={{ key: "in" }}
      out:send={{ key: "out" }}
      animate:flip={{
        duration: transitionDuration.duration,
        easing: cubicOut,
      }}
    >
      {getNextInterval(next, $intervalDisplayMode, $tritoneDisplayMode)}
    </div>
  {/each}
</div>
