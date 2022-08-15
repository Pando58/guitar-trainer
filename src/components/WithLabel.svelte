<script lang="ts">
  export let text = "";
</script>

<div
  class="inline-block text-gray-200 font-medium text-xs leading-tight uppercase"
>
  {#if text}
    {text}:
  {/if}
  <slot />
</div>
