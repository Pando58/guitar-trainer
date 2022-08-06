<script lang="ts">
  import { crossfade, type CrossfadeParams } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { flip } from "svelte/animate";
  import svg_timer from "./assets/timer.svg";
  import Button from "./components/Button.svelte";
  import Select from "./components/Select.svelte";
  import { noteGenerator } from "./stores/noteGenerator";
  import { scales, intervalNames } from "./data/scales";

  let timerActive = false;
  let selectedScale = $noteGenerator.selectedScale;
  let timerValue = 5;
  let displayAmount = $noteGenerator.displayAmount;
  let timerInterval;
  let counter = 0;
  
  $: timerFaded = !timerActive;

  $: transitionDuration = {
    duration: Math.min(400, (timerValue * 1000) - 25)
  }

  $: counterLimit = displayAmount + 20;

  function pullNote() {
    noteGenerator.pullNote();
    if (counter + 1 > counterLimit - 1) {
      counter = 0;
    } else {
      counter++;
    }
  }

  function getCounterId(n) {
    return n - (Math.floor(n / counterLimit) * counterLimit);
  }
  
  $: {
    if (timerActive) {
      timerInterval = setInterval(() => {
        pullNote();
      }, timerValue * 1000);
    } else {
      clearInterval(timerInterval);
    }
  };

  $: {
    noteGenerator.selectScale(selectedScale);
  };

  $: {
    noteGenerator.setDisplayAmount(displayAmount);
  };

  $: {
    selectedScale;
    timerValue;
    displayAmount;

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
      <Select list={Object.keys(scales)} bind:selected={selectedScale}></Select>
    </div>
    <div class="controls">
      Display amount:
      <input step=1 min=1 max=20 bind:value={displayAmount} type="number" class="w-14">
    </div>
    <div class="controls">
      <Button on:click={() => timerActive = !timerActive} bind:faded={timerFaded} icon={svg_timer} useBorder={false} noPadding={true}></Button>
      Timer:
      <input step=0.1 min=0.1 max=100 bind:value={timerValue} type="number" class="w-16">
    </div>
    <span class="w-4"></span>
    <div>
      <Button text="reset" on:click={noteGenerator.reset}></Button>
      <Button text="next" on:click={pullNote}></Button>
    </div>
  </div>
  <div class="w-full flex flex-col items-center pt-20 pb-10">
    {#each $noteGenerator.nextBag as next, i (getCounterId(i + counter))}
      <div
        class="{i == 0 ? 'text-6xl text-gray-50' : 'text-4xl text-gray-400'}"
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
