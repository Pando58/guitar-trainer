<script>
  import Select from "@/components/Select.svelte";
  import InputNumber from "@/components/InputNumber.svelte";
  import { getEntry } from "@/utils/translate";
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
    <span>{getEntry("settings.scale")}</span>
    <Select
      displayList={Object.values(getEntry("scales"))}
      list={settings.selectedScale.list}
      bind:selected={$selectedScale}
      textTransform="capitalize"
    />
  </div>
  <div class="setting">
    <span>{getEntry("settings.displayAmount")}</span>
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
    <span>{getEntry("settings.intervalDisplayMode")}</span>
    <Select
      displayList={getEntry("intervalDisplayModes")}
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
