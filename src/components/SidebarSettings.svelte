<script>
  import Select from "@/components/Select.svelte";
  import InputNumber from "@/components/InputNumber.svelte";
  import { getEntries, getEntry } from "@/utils/lang";
  import {
    updateInput,
    selectedScale,
    intervalDisplayMode,
  } from "@/stores/settingsStore";
  import settings from "@/data/settings";
</script>

<div
  class="flex flex-col w-full sm:w-[32rem] px-2 xs:px-4 divide-y divide-black divide-opacity-20"
>
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
      value={settings.displayAmount.value}
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
</div>

<style>
  .setting {
    @apply flex-1 flex justify-between items-center pl-4 py-1;
  }

  .setting span {
    @apply text-gray-200 font-medium text-sm lowercase;
  }

  .setting span::first-letter {
    @apply uppercase;
  }
</style>
