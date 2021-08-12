<script>
  import { onMount } from "svelte";
  import Canvas from "../../canvas/Canvas.svelte";
  import { getResults } from "../../../api/result.api";
  import Spinner from "../../spinner/Spinner.svelte";
  import "./resultpage.style.css";
  import { GTYPE } from "../../../../global/constants/constants";

  export let eventId;

  $: tableData = [];
  let selectedSource = GTYPE.REMOTE;

  $: if (selectedSource !== undefined) {
    console.log("selectedSource ", selectedSource);
    async function refreshTable() {
      const requestData = {
        eventId: eventId,
        gType: selectedSource,
      };
      tableData = await getResults(requestData);
    }
    refreshTable();
  }

  onMount(() => {
    console.log("selectedSource ", selectedSource);
    async function refreshTable() {
      const requestData = {
        eventId: eventId,
        gType: selectedSource,
      };
      tableData = await getResults(requestData);
    }
    refreshTable();
  });
</script>

<div class="result-page">
  {#if tableData?.length > 0}
    <Canvas {tableData} bind:selectedSource />
  {:else}
    <Spinner />
  {/if}
</div>
