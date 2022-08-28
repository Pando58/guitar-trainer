<script lang="ts">
  import Button from "@/components/Button.svelte";
  import { get } from "svelte/store";
  import { noteGenerator } from "@/stores/noteGenerator";
  import { displayAmount } from "@/stores/settingsStore";
  import { counter } from "@/stores/displayCounter";
  import { pitchSmooth, pitchChanging } from "@/stores/pitchDetection";
  import { getEntry } from "@/utils/lang";
  import IntervalDisplay from "@/components/IntervalDisplay.svelte";

  $: counterLimit = $displayAmount + 20;

  function pullNote() {
    noteGenerator.pullNote();
    if (get(counter) + 1 > counterLimit - 1) {
      $counter = 0;
    } else {
      $counter++;
    }
  }

  function btnReset() {
    noteGenerator.reset();
  }

  function btnNext() {
    pullNote();
  }
</script>

<div class="flex-1 flex items-center justify-center flex-wrap gap-x-4 p-1.5">
  <div
    class={`w-16 text-center text-xs font-semibold ${
      $pitchChanging ? "text-gray-200" : "text-gray-400"
    }`}
  >
    {$pitchSmooth === -1 ? "-" : Math.round($pitchSmooth)} Hz
  </div>
  <div>
    <Button text={getEntry((e) => e.reset)} on:click={btnReset} />
    <Button text={getEntry((e) => e.next)} on:click={btnNext} />
  </div>
</div>

<IntervalDisplay {counterLimit} />
