<script lang="ts">
  import { EventType } from "../../../../global/constants/constants";
  import HorizontalScorePreview from "./HorizontalScorePreview.svelte";
  import VerticalScorePreview from "./VerticalScorePreview.svelte";
  import RunningScorePreview from "./RunningScorePreview.svelte";

  export let type = EventType.HORIZONTAL;
</script>

<div id="scores--wrapper">
  {#if type === EventType.HORIZONTAL}
    <HorizontalScorePreview />
  {:else if type === EventType.VERTICAL}
    <VerticalScorePreview />
  {:else}
    <RunningScorePreview />
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
