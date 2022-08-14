<script lang="ts">
  export let text = "";
  export let icon = "";
  export let useBorder = true;
  export let faded = false;
  export let noPadding = false;
</script>

<button
  type="button"
  on:click
  class:brightness-50={faded}
  class:border-2={useBorder}
  class:shrink-0={icon}
  class:px-6={!noPadding}
  class:px-2={noPadding}
  class="m-1.5 py-2 border-2 border-gray-400 text-gray-200 font-medium text-xs leading-tight uppercase rounded hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-0 transition duration-75 ease-in-out"
>
  {#if text}
    {text}
  {/if}
  {#if icon}
    <img src={icon} alt={icon} class="h-6 inline-block" />
  {/if}
</button>
