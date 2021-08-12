<script>
  import { onMount } from "svelte";
  import Canvas from "../../canvas/Canvas.svelte";
  import { getEventData } from "../../../api/event.api";
  import Spinner from "../../spinner/Spinner.svelte";
  import "./eventdatapage.style.css";

  export let eventId;

  $: tableData = [];

  onMount(async () => {
    const requestData = {
      eventId: eventId,
      gType: "remote",
    };
    tableData = await getEventData(requestData);
  });
</script>

<div class="result-page">
  {#if tableData?.length > 0}
    <Canvas {tableData} />
  {:else}
    <Spinner />
  {/if}
</div>
