<script lang="ts">
  import { crossfade, type CrossfadeParams } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { flip } from "svelte/animate";
  import { get } from "svelte/store";
  import svg_timer from "@/assets/timer.svg";
  import Button from "@/components/Button.svelte";
  import Select from "@/components/Select.svelte";
  import InputNumber from "@/components/InputNumber.svelte";
  import { noteGenerator, nextNotes } from "@/stores/noteGenerator";
  import {
    stores as appSettings,
    selectedScale,
    displayAmount,
    nextNoteTimer
  } from "@/stores/appSettings";
  import { intervalNames, scaleNames } from "@/data/scales";

  let timerActive = false;
  let counter = 0;
  let timerInterval: NodeJS.Timer = null;
  
  $: timerFaded = !timerActive;
  $: counterLimit = $displayAmount + 20;
  $: transitionDuration = {
    duration: Math.min(400, ($nextNoteTimer * 1000) - 25)
  }

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
    return n - (Math.floor(n / counterLimit) * counterLimit);
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
  };

  $: {
    noteGenerator.selectScale($selectedScale);
  };

  $: {
    noteGenerator.setDisplayAmount($displayAmount);
  };

  $: {
    $nextNoteTimer;
    
    timerActive = false;
  }

  $: {
    $selectedScale;
    $displayAmount;

    timerActive = false;
    noteGenerator.reset();
  };

  const [send, receive] = crossfade({
    fallback: (node, { key }: CrossfadeParams & {key: any}) => {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;
      
			return {
        duration: transitionDuration.duration,
				easing: cubicOut,
				css: (t, u) => `
          transform: ${transform} ${key === "in" ? `translateY(${u * 60}px)` : `scale(${t})`};
          opacity: ${t}
        `
			};
		}
  });
</script>

<main class="w-full h-full p-1.5">
  <div class="flex items-center justify-center flex-wrap">
    <div class="controls">
      Scale:
      <Select list={scaleNames} bind:selected={$selectedScale}></Select>
    </div>
    <div class="controls">
      Display amount:
      <InputNumber name={"displayAmount"} value={$displayAmount} step={1} min={1} max={20} on:updateInput={updateInput} class_="w-14"></InputNumber>
    </div>
    <div class="controls">
      <Button on:click={() => timerActive = !timerActive} bind:faded={timerFaded} icon={svg_timer} useBorder={false} noPadding={true}></Button>
      Timer:
      <InputNumber name={"nextNoteTimer"} value={$nextNoteTimer} step={0.1} min={0.1} max={60} on:updateInput={updateInput} class_="w-16"></InputNumber>
    </div>
    <span class="w-4"></span>
    <div>
      <Button text="reset" on:click={btnReset}></Button>
      <Button text="next" on:click={btnNext}></Button>
    </div>
  </div>
  <div class="w-full flex flex-col items-center pt-20 pb-10">
    {#each $nextNotes as next, i (getCounterId(i + counter))}
      <div
        class="{i === 0 ? 'text-6xl text-gray-50' : 'text-4xl text-gray-400'}"
        in:receive={{key: "in"}}
        out:send={{key: "out"}}
        animate:flip={{duration: transitionDuration.duration, easing: cubicOut}}
      >
        {intervalNames[next]}
      </div>
    {/each}
  </div>
</main>

<style>
  .controls {
    @apply ml-2 text-gray-200 font-medium text-xs leading-tight uppercase;
  }
</style>
