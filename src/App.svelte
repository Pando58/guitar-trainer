<script lang="ts">
  import { crossfade, type CrossfadeParams } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { flip } from "svelte/animate";
  import { get } from "svelte/store";
  import svg_timer from "@/assets/timer.svg";
  import svg_config from "@/assets/config.svg";
  import Button from "@/components/Button.svelte";
  import Select from "@/components/Select.svelte";
  import InputNumber from "@/components/InputNumber.svelte";
  import Sidebar from "./components/Sidebar.svelte";
  import { noteGenerator, nextNotes } from "@/stores/noteGenerator";
  import {
    stores as appSettings,
    selectedScale,
    displayAmount,
    nextNoteTimer,
  } from "@/stores/appSettings";
  import { scaleNames } from "@/data/scales";
  import { getEntry } from "@/utils/translate";

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

  function updateInput({ detail }: CustomEvent) {
    const { input, value, update } = detail;

    appSettings[input].set(value);
    update(get(appSettings[input]));
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
    <div class="flex-1 flex items-center justify-center flex-wrap p-1.5">
      <div class="controls">
        {getEntry("scale")}:
        <Select
          displayList={Object.values(getEntry("scales"))}
          list={scaleNames}
          bind:selected={$selectedScale}
        />
      </div>
      <div class="controls">
        {getEntry("displayAmount")}:
        <InputNumber
          name={"displayAmount"}
          value={$displayAmount}
          step={1}
          min={1}
          max={20}
          on:updateInput={updateInput}
          class_="w-14"
        />
      </div>
      <div class="controls">
        <Button
          on:click={() => (timerActive = !timerActive)}
          bind:faded={timerFaded}
          icon={svg_timer}
          useBorder={false}
          noPadding={true}
        />
        {getEntry("timer")}:
        <InputNumber
          name={"nextNoteTimer"}
          value={$nextNoteTimer}
          step={0.1}
          min={0.1}
          max={60}
          on:updateInput={updateInput}
          class_="w-16"
        />
      </div>
      <span class="w-4" />
      <div>
        <Button text={getEntry("reset")} on:click={btnReset} />
        <Button text={getEntry("next")} on:click={btnNext} />
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
        class={i === 0 ? "text-6xl text-gray-50" : "text-4xl text-gray-400"}
        in:receive={{ key: "in" }}
        out:send={{ key: "out" }}
        animate:flip={{
          duration: transitionDuration.duration,
          easing: cubicOut,
        }}
      >
        {getEntry(`intervals.abbreviated.${next}`)}
      </div>
    {/each}
  </div>
</main>

<style>
  .controls {
    @apply ml-2 text-gray-200 font-medium text-xs leading-tight uppercase;
  }
</style>
