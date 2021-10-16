<script lang="ts">
  import { EventType } from "../../../../../global/constants/constants";
  import HorizontalScore from "./HorizontalScore.svelte";
  import VerticalScore from "./VerticalScore.svelte";
  import RunningScore from "./RunningScore.svelte";
  import { visibleGraphics } from "../../../../stores/stream.store";
</script>

<div id="scores--wrapper">
  {#if $visibleGraphics.type === EventType.HORIZONTAL}
    <HorizontalScore />
  {:else if $visibleGraphics.type === EventType.VERTICAL}
    <VerticalScore />
  {:else}
    <RunningScore />
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
