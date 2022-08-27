<script lang="ts">
  import svg_config from "@/assets/config.svg";
  import Sidebar from "@/components/Sidebar.svelte";
  import Streak from "@/components/gamemodes/Streak.svelte";
  import { noteGenerator } from "@/stores/noteGenerator";
  import { selectedScale, displayAmount } from "@/stores/settingsStore";

  let sidebar: Sidebar;

  function openSidebar() {
    sidebar.open();
  }

  $: {
    noteGenerator.selectScale($selectedScale);
  }

  $: {
    noteGenerator.setDisplayAmount($displayAmount);
  }
</script>

<div class="absolute right-0 w-10">
  <button class="p-2" on:click={openSidebar}>
    <img src={svg_config} alt="config" />
  </button>
</div>
<Sidebar bind:this={sidebar} />
<Streak />
