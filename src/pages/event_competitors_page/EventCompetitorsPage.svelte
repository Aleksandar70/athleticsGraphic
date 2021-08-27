<script>
  import { onMount } from "svelte";
  import Canvas from "../../components/canvas/Canvas.svelte";
  import { getCompetitorResultsData } from "../../components/data_table/table.helper";
  import Spinner from "../../components/spinner/Spinner.svelte";
  import "./eventcompetitorspage.style.css";
  import { defaultEventCompetitorsColumns } from "../../../global/defaults";
  import { updateCompetitors } from "../../api/competitor.api";

  export let eventId;

  $: tableData = [];

  onMount(async () => {
    tableData = getCompetitorResultsData(eventId);
  });
</script>

<div class="event-competitors--page">
  {#if tableData.length > 0}
    <Canvas
      {tableData}
      defaultColumns={defaultEventCompetitorsColumns}
      updateAction={updateCompetitors}
    />
  {:else}
    <Spinner />
  {/if}
</div>
