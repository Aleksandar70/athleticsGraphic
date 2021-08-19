<script>
  import { onMount } from "svelte";
  import Canvas from "../../components/canvas/Canvas.svelte";
  import { getEventCompetitors } from "../../api/event.api";
  import Spinner from "../../components/spinner/Spinner.svelte";
  import "./eventcompetitorspage.style.css";
  import { defaultEventCompetitorsColumns } from "../../../global/defaults";
  import { updateCompetitors } from "../../api/competitor.api";

  export let eventId;

  $: tableData = [];

  onMount(async () => {
    tableData = await getEventCompetitors(eventId);
  });
</script>

<div class="event-competitors--page">
  {#if tableData?.length > 0}
    <Canvas
      {tableData}
      defaultColumns={defaultEventCompetitorsColumns}
      updateAction={updateCompetitors}
    />
  {:else}
    <Spinner />
  {/if}
</div>
