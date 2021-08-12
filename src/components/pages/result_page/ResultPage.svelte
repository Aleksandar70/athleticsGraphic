<script>
  import { onMount } from "svelte";
  import Canvas from "../../canvas/Canvas.svelte";
  import { getResults } from "../../../api/result.api";
  import Spinner from "../../spinner/Spinner.svelte";
  import "./resultpage.style.css";

  export let eventId;

  $: tableData = [];

  onMount(async () => {
    const requestData = {
      eventId: eventId,
      gType: selectedSource,
    };
    tableData = await getResults(requestData);
  });
</script>

<div class="result-page">
  {#if tableData?.length > 0}
    <Canvas {tableData} />
  {:else}
    <Spinner />
  {/if}
</div>
