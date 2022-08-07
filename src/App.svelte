<script lang="ts">
  import { crossfade, type CrossfadeParams } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { flip } from "svelte/animate";
  import { get } from "svelte/store";
  import svg_timer from "./assets/timer.svg";
  import Button from "./components/Button.svelte";
  import Select from "./components/Select.svelte";
  import { noteGenerator } from "./stores/noteGenerator";
  import { intervalNames, scaleNames } from "./data/scales";
  import {
    stores,
    selectedScale,
    displayAmount,
    nextNoteTimer
  } from "./stores/appSettings";

  let timerActive = false;
  let counter = 0;
  let timerInterval: NodeJS.Timer = null;
  let inputs = {
    displayAmount: $displayAmount,
    nextNoteTimer: $nextNoteTimer
  }
  
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

  function updateInput(input: string) {
    stores[input].set(inputs[input]);
    inputs[input] = get(stores[input]);
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
      <input bind:value={inputs.displayAmount} on:change={() => updateInput("displayAmount")} step=1 min=1 max=20 type="number" class="w-14">
    </div>
    <div class="controls">
      <Button on:click={() => timerActive = !timerActive} bind:faded={timerFaded} icon={svg_timer} useBorder={false} noPadding={true}></Button>
      Timer:
      <input bind:value={inputs.nextNoteTimer} on:change={() => updateInput("nextNoteTimer")} step=0.1 min=0.1 max=60 type="number" class="w-16">
    </div>
    <span class="w-4"></span>
    <div>
      <Button text="reset" on:click={btnReset}></Button>
      <Button text="next" on:click={btnNext}></Button>
    </div>
  </div>
  <div class="w-full flex flex-col items-center pt-20 pb-10">
    {#each $noteGenerator.nextBag as next, i (getCounterId(i + counter))}
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

  input[type=number] {
    @apply bg-transparent m-1.5 px-2 py-1 border-2 border-gray-400 text-gray-200 font-medium text-xs leading-tight uppercase rounded;
    /* @apply hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-0 transition duration-75 ease-in-out; */
  }
</style>
