<script>
  import { onMount } from "svelte";
  import Canvas from "../../canvas/Canvas.svelte";
  import { getEventCompetitors } from "../../../api/event.api";
  import Spinner from "../../spinner/Spinner.svelte";
  import "./eventcompetitorspage.style.css";

  export let eventId;

  $: tableData = [];

  onMount(async () => {
    tableData = await getEventCompetitors(eventId);
  });
</script>

<div class="result-page">
  {#if tableData?.length > 0}
    <Canvas {tableData} />
  {:else}
    <Spinner />
  {/if}
</div>
