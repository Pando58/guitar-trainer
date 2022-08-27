<script lang="ts">
  import svg_config from "@/assets/config.svg";
  import type { SvelteComponent } from "svelte";
  import Sidebar from "@/components/Sidebar.svelte";
  import Streak from "@/components/gamemodes/Streak.svelte";
  import Practice from "./components/gamemodes/Practice.svelte";
  import { noteGenerator } from "@/stores/noteGenerator";
  import {
    gamemode,
    selectedScale,
    displayAmount,
  } from "@/stores/settingsStore";

  const gamemodeComponents: { [key: string]: typeof SvelteComponent } = {
    streak: Streak,
    practice: Practice,
  };

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
<svelte:component this={gamemodeComponents[$gamemode]} />
