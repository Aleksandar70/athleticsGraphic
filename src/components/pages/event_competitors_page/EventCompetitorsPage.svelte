<script>
  import { onMount } from "svelte";
  import Canvas from "../../canvas/Canvas.svelte";
  import { getEventCompetitors } from "../../../api/event.api";
  import Spinner from "../../spinner/Spinner.svelte";
  import "./eventcompetitorspage.style.css";
  import { defaultEventCompetitorsColumns } from "../../../../global/defaults";

  export let eventId;

  $: tableData = [];
  let selectedSource = GTYPE.REMOTE;

  onMount(async () => {
    tableData = await getEventCompetitors(eventId);
  });
</script>

<div class="result-page">
  {#if tableData?.length > 0}
    <Canvas {tableData} defaultColumns={defaultEventCompetitorsColumns} />
  {:else}
    <Spinner />
  {/if}
</div>
