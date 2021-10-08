<script lang="ts">
  import { EventType } from "../../../../global/constants/constants";
  import HorizontalScorePreview from "./HorizontalScorePreview.svelte";
  import VerticalScorePreview from "./VerticalScorePreview.svelte";
  import RunningScorePreview from "./RunningScorePreview.svelte";
  import { visiblePreview } from "../../../stores/preview.store";

  export let data = {};
  export let modalOpened = true;

  $: if (!modalOpened) {
    visiblePreview.set({
      id: "",
      data: {},
      type: undefined,
      modalOpened: false,
    });
  }
  export let type = EventType.HORIZONTAL;
</script>

<div id="scores--wrapper">
  {#if type === EventType.HORIZONTAL}
    <HorizontalScorePreview {data} />
  {:else if type === EventType.VERTICAL}
    <VerticalScorePreview {data} />
  {:else}
    <RunningScorePreview {data} />
  {/if}
</div>

<style>
  #scores--wrapper {
    width: 1920px;
    height: 1080px;
    z-index: 0;
    position: fixed;
    top: 0px;
    left: 0px;
  }
</style>
