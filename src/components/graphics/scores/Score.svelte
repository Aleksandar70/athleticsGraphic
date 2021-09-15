<script lang="ts">
  import { clearChannel } from "../../../stores/stream.store";
  import { EventType } from "../../../../global/constants/constants";
  import HorizontalScore from "./HorizontalScore.svelte";
  import VerticalScore from "./VerticalScore.svelte";
  import RunningScore from "./RunningScore.svelte";

  export let data = {};
  export let clear = false;
  export let type = EventType.HORIZONTAL;

  $clearChannel.addEventListener("message", (event) => (clear = event.data));
</script>

<div id="scores--wrapper">
  {#if type === EventType.HORIZONTAL}
    <HorizontalScore {data} bind:clear />
  {:else if type === EventType.VERTICAL}
    <VerticalScore {data} bind:clear />
  {:else}
    <RunningScore {data} bind:clear />
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
