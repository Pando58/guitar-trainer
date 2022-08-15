<script lang="ts">
  export let displayList: ArrayLike<unknown> = [];
  export let list: ArrayLike<unknown> = [];
  export let selected: string;
  export let textTransform: "uppercase" | "capitalize" = null;

  $: transform =
    textTransform === "uppercase"
      ? "text-xs uppercase font-medium"
      : textTransform === "capitalize"
      ? "text-sm capitalize font-medium"
      : "text-sm font-medium";
</script>

<select
  bind:value={selected}
  class={`${transform} bg-transparent m-1.5 pl-2 py-1 border-2 border-gray-400 text-gray-200 leading-tight rounded hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-0 transition duration-75 ease-in-out`}
>
  {#each displayList as item, i}
    <option value={list[i]} class="bg-gray-900">{item}</option>
  {/each}
</select>
