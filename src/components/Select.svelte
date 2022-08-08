<script lang="ts">
  export let list: ArrayLike<unknown> = [];
  export let selected: string;
</script>

<select bind:value={selected} class="bg-transparent m-1.5 pl-2 py-1 border-2 border-gray-400 text-gray-200 font-medium text-xs leading-tight uppercase rounded hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-0 transition duration-75 ease-in-out">
  {#each list as item}
    <option value={item} class="bg-gray-900">{item}</option>
  {/each}
</select>
