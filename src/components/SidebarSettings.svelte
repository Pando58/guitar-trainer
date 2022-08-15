<script>
  import Select from "@/components/Select.svelte";
  import InputNumber from "@/components/InputNumber.svelte";
  import { getEntry } from "@/utils/translate";
  import {
    updateInput,
    selectedScale,
    displayAmount,
    intervalDisplayMode,
  } from "@/stores/settingsStore";
  import { scaleNames } from "@/data/scales";
  import { intervalDisplayModes } from "@/data/settings";
</script>

<div
  class="flex flex-col w-full sm:w-[32rem] px-2 xs:px-4 divide-y divide-black divide-opacity-20"
>
  <div class="setting">
    <span>{getEntry("settings.scale")}</span>
    <Select
      displayList={Object.values(getEntry("scales"))}
      list={scaleNames}
      textTransform="capitalize"
      bind:selected={$selectedScale}
    />
  </div>
  <div class="setting">
    <span>{getEntry("settings.displayAmount")}</span>
    <InputNumber
      name={"displayAmount"}
      value={$displayAmount}
      step={1}
      min={1}
      max={20}
      on:updateInput={updateInput}
      class_="w-14"
    />
  </div>
  <div class="setting">
    <span>{getEntry("settings.intervalDisplayMode")}</span>
    <Select
      displayList={getEntry("intervalDisplayModes")}
      list={intervalDisplayModes}
      textTransform="capitalize"
      bind:selected={$intervalDisplayMode}
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
