<script lang="ts">
  import { clearChannel } from "../../../stores/stream.store";
  import { EventType } from "../../../../global/constants/constants";
  import HorizontalScore from "./HorizontalScore.svelte";
  import VerticalScore from "./VerticalScore.svelte";
  import RunningScore from "./RunningScore.svelte";

  export let data = {};
  export let type = EventType.HORIZONTAL;
</script>

<div id="scores--wrapper">
  {#if type === EventType.HORIZONTAL}
    <HorizontalScore {data} />
  {:else if type === EventType.VERTICAL}
    <VerticalScore {data} />
  {:else}
    <RunningScore {data} />
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
