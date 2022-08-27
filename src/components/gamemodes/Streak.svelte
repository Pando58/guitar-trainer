<script lang="ts">
  import svg_timer from "@/assets/timer.svg";
  import Button from "@/components/Button.svelte";
  import InputNumber from "@/components/InputNumber.svelte";
  import WithLabel from "@/components/WithLabel.svelte";
  import { get } from "svelte/store";
  import { noteGenerator } from "@/stores/noteGenerator";
  import {
    updateInput,
    selectedScale,
    displayAmount,
    nextNoteTimer,
  } from "@/stores/settingsStore";
  import { counter } from "@/stores/displayCounter";
  import { getEntry } from "@/utils/lang";
  import IntervalDisplay from "@/components/IntervalDisplay.svelte";

  let timerActive = false;
  let timerInterval: NodeJS.Timer = null;

  $: counterLimit = $displayAmount + 20;
  $: timerFaded = !timerActive;

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
    $nextNoteTimer;

    timerActive = false;
  }

  $: {
    $selectedScale;
    $displayAmount;

    timerActive = false;
  }

  function pullNote() {
    noteGenerator.pullNote();
    if (get(counter) + 1 > counterLimit - 1) {
      $counter = 0;
    } else {
      $counter++;
    }
  }

  function btnReset() {
    timerActive = false;
    noteGenerator.reset();
  }

  function btnNext() {
    timerActive = false;
    pullNote();
  }
</script>

<div class="flex-1 flex items-center justify-center flex-wrap gap-x-4 p-1.5">
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

<IntervalDisplay {counterLimit} />
