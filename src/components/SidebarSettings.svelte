<script lang="ts">
  import Select from "@/components/Select.svelte";
  import InputNumber from "@/components/InputNumber.svelte";
  import { getCurrentLang, getEntries, getEntry } from "@/utils/lang";
  import {
    updateInput,
    gamemode,
    selectedScale,
    displayAmount,
    intervalDisplayMode,
    tritoneDisplayMode,
    rootNote,
  } from "@/stores/settingsStore";
  import settings from "@/data/settings";

  function langChange(e: InputEvent) {
    location.href =
      location.origin +
      location.pathname +
      "?lang=" +
      (<HTMLSelectElement>e.target).value;
  }
</script>

<div class="flex flex-col w-full sm:w-[32rem] px-6">
  <span class="title">{getEntry((e) => e.settings.titles.general)}</span>
  <div class="group">
    <div class="setting">
      <span>{getEntry((e) => e.settings.gamemode.label)}</span>
      <Select
        displayList={Object.values(
          getEntries((e) => e.settings.gamemode.options)
        )}
        list={settings.gamemode.list}
        bind:selected={$gamemode}
        textTransform="capitalize"
      />
    </div>
    <div class="setting">
      <span>{getEntry((e) => e.settings.scale.label)}</span>
      <Select
        displayList={Object.values(getEntries((e) => e.settings.scale.options))}
        list={settings.selectedScale.list}
        bind:selected={$selectedScale}
        textTransform="capitalize"
      />
    </div>
    <div class="setting">
      <span>{getEntry((e) => e.settings.displayAmount)}</span>
      <InputNumber
        value={$displayAmount}
        min={settings.displayAmount.min}
        max={settings.displayAmount.max}
        step={settings.displayAmount.step}
        name={"displayAmount"}
        on:updateInput={updateInput}
        class_="w-14"
      />
    </div>
    <div class="setting">
      <span>{getEntry((e) => e.settings.intervalDisplayMode.label)}</span>
      <Select
        displayList={Object.values(
          getEntries((e) => e.settings.intervalDisplayMode.options)
        )}
        list={settings.intervalDisplayMode.list}
        bind:selected={$intervalDisplayMode}
        textTransform="capitalize"
      />
    </div>
    <div class="setting">
      <span>{getEntry((e) => e.settings.tritoneDisplayMode.label)}</span>
      <Select
        displayList={Object.values(
          getEntries((e) => e.settings.tritoneDisplayMode.options)
        )}
        list={settings.tritoneDisplayMode.list}
        bind:selected={$tritoneDisplayMode}
        textTransform="capitalize"
      />
    </div>
  </div>
  <span class="title">{getEntry((e) => e.settings.titles.noteDetection)}</span>
  <div class="group">
    <div class="setting">
      <span>{getEntry((e) => e.settings.rootNote)}</span>
      <div class="subsetting">
        <InputNumber
          value={$rootNote}
          min={settings.rootNote.min}
          max={settings.rootNote.max}
          step={settings.rootNote.step}
          name={"rootNote"}
          on:updateInput={updateInput}
          class_="w-20"
        />
        <span>Hz</span>
      </div>
    </div>
  </div>
  <span class="title">{getEntry((e) => e.settings.titles.language)}</span>
  <div class="group">
    <div class="setting">
      <span>{getEntry((e) => e.settings.language.label)}</span>
      <Select
        displayList={Object.values(
          getEntries((e) => e.settings.language.options)
        )}
        list={Object.keys(getEntries((e) => e.settings.language.options))}
        selected={getCurrentLang()}
        on:change={langChange}
        textTransform="capitalize"
      />
    </div>
  </div>
</div>

<style>
  .title {
    @apply mb-3 mt-5 text-sm font-bold;
  }

  .title::first-letter {
    @apply uppercase;
  }

  .group {
    @apply px-2 py-1 bg-black bg-opacity-10 rounded-lg;
  }

  .setting {
    @apply flex-1 flex justify-between items-center pl-4 py-1;
  }

  .setting:not(:first-child) {
    @apply border-t border-black border-opacity-40;
  }

  .setting > span {
    @apply text-gray-200 font-medium text-sm lowercase;
  }

  .setting > span::first-letter {
    @apply uppercase;
  }

  .subsetting > span {
    @apply text-xs font-semibold;
  }

  .subsetting > span:last-child {
    @apply mr-2;
  }
</style>
