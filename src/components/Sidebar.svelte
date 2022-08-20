<script lang="ts">
  import { fade, scale } from "svelte/transition";
  import { cubicIn } from "svelte/easing";
  import SidebarSettings from "@/components/SidebarSettings.svelte";
  import svg_close from "@/assets/close.svg";

  let visible = false;

  export function open() {
    visible = true;
  }
</script>

{#if visible}
  <div
    transition:fade={{ duration: 300 }}
    class="fixed z-10 inset-0 bg-black bg-opacity-30"
  >
    <div
      in:scale={{ start: 0.7, duration: 300 }}
      out:scale={{ start: 0.7, duration: 300, easing: cubicIn }}
      class="absolute inset-1 xs:inset-6 sm:inset-12 px-2 py-8 bg-gray-800 bg-opacity-95 sm:bg-opacity-90 shadow-md rounded"
    >
      <button
        class="absolute right-2 top-2 p-1"
        on:click={() => (visible = false)}
      >
        <img src={svg_close} class="h-3 opacity-50 xs:opacity-20" alt="close" />
      </button>
      <div class="w-full h-full overflow-y-auto flex justify-center">
        <SidebarSettings />
      </div>
    </div>
  </div>
{/if}
