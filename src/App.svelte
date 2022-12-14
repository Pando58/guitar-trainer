<script lang="ts">
  import { crossfade, type CrossfadeParams } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { flip } from "svelte/animate";
  import { get } from "svelte/store";
  import svg_timer from "@/assets/timer.svg";
  import svg_config from "@/assets/config.svg";
  import Button from "@/components/Button.svelte";
  import InputNumber from "@/components/InputNumber.svelte";
  import WithLabel from "@/components/WithLabel.svelte";
  import Sidebar from "@/components/Sidebar.svelte";
  import { noteGenerator, nextNotes } from "@/stores/noteGenerator";
  import {
    updateInput,
    selectedScale,
    displayAmount,
    nextNoteTimer,
    intervalDisplayMode,
    tritoneDisplayMode,
  } from "@/stores/settingsStore";
  import { getEntry, getEntryWithString } from "@/utils/lang";

  let sidebar: Sidebar;
  let timerActive = false;
  let counter = 0;
  let timerInterval: NodeJS.Timer = null;

  $: timerFaded = !timerActive;
  $: counterLimit = $displayAmount + 20;
  $: transitionDuration = {
    duration: Math.min(400, $nextNoteTimer * 1000 - 25),
  };

  function pullNote() {
    noteGenerator.pullNote();
    if (counter + 1 > counterLimit - 1) {
      counter = 0;
    } else {
      counter++;
    }
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

  function btnReset() {
    timerActive = false;
    noteGenerator.reset();
  }

  function btnNext() {
    timerActive = false;
    pullNote();
  }

  function getCounterId(n: number) {
    return n - Math.floor(n / counterLimit) * counterLimit;
  }

  function openSidebar() {
    sidebar.open();
  }

  $: {
    if (timerActive) {
      if (timerInterval === null) {
        timerInterval = setInterval(() => {
          pullNote();
        }, get(nextNoteTimer) * 1000);
      }
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  $: {
    noteGenerator.selectScale($selectedScale);
  }

  $: {
    noteGenerator.setDisplayAmount($displayAmount);
  }

  $: {
    $nextNoteTimer;

    timerActive = false;
  }

  $: {
    $selectedScale;
    $displayAmount;

    timerActive = false;
    noteGenerator.reset();
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

<main class="w-full h-full">
  <Sidebar bind:this={sidebar} />
  <div class="flex">
    <div class="w-10" />
    <div
      class="flex-1 flex items-center justify-center flex-wrap gap-x-4 p-1.5"
    >
      <div class="flex items-center">
        <Button
          on:click={() => (timerActive = !timerActive)}
          bind:faded={timerFaded}
          icon={svg_timer}
          useBorder={false}
          noPadding={true}
        />
        <WithLabel text={getEntry((e) => e.timer)}>
          <InputNumber
            name={"nextNoteTimer"}
            value={$nextNoteTimer}
            step={0.1}
            min={0.1}
            max={60}
            on:updateInput={updateInput}
            class_="w-16"
          />
        </WithLabel>
      </div>
      <div>
        <Button text={getEntry((e) => e.reset)} on:click={btnReset} />
        <Button text={getEntry((e) => e.next)} on:click={btnNext} />
      </div>
    </div>
    <div class="w-10">
      <button class="p-2" on:click={openSidebar}>
        <img src={svg_config} alt="config" />
      </button>
    </div>
  </div>
  <div class="w-full flex flex-col items-center pt-20 pb-10">
    {#each $nextNotes as next, i (getCounterId(i + counter))}
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
</main>
