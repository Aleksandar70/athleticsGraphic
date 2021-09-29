<script lang="ts">
  import { EventType } from "../../../global/constants/constants";
  import HorizontalScorePreviewPage from "./HorizontalScorePreviewPage.svelte";
  import VerticalScorePreviewPage from "./VerticalScorePreviewPage.svelte";
  import RunningScorePreviewPage from "./RunningScorePreviewPage.svelte";

  export let data = {};
  export let type = EventType.HORIZONTAL;
</script>

<div id="scores--wrapper">
  {console.log("type ", type)}
  {#if type === EventType.HORIZONTAL}
    {console.log("USAO1")}
    <HorizontalScorePreviewPage {data} />
  {:else if type === EventType.VERTICAL}
    {console.log("USAO2")}
    <VerticalScorePreviewPage {data} />
  {:else}
    <RunningScorePreviewPage {data} />
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
