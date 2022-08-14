<script lang="ts">
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";

  export let name: string;
  export let value: number = undefined;
  export let min: number = null;
  export let max: number = null;
  export let step: number = null;
  export let class_ = "";

  let input: HTMLInputElement;

  const dispatch = createEventDispatcher();

  function updateInput() {
    dispatch("updateInput", {
      input: name,
      value,
      update: (val: number) => {
        value = val;
      },
    });
  }

  onMount(() => {
    if (min !== null) input.min = min.toString();
    if (max !== null) input.max = max.toString();
    if (step !== null) input.step = step.toString();
  });
</script>

<input
  bind:this={input}
  bind:value
  on:change={updateInput}
  type="number"
  class={`${class_} bg-transparent m-1.5 px-2 py-1 border-2 border-gray-400 text-gray-200 font-medium text-xs leading-tight uppercase rounded hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-0 transition duration-75 ease-in-out`}
/>
