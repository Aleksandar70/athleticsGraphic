<script lang="ts">
  import Canvas from "../../canvas/Canvas.svelte";
  import { onMount } from "svelte";
  import { getEventData } from "../../../api/event.api";
  import Spinner from "../../spinner/Spinner.svelte";
  import "./eventlistpage.style.css";
  import { defaultEventColumns } from "../../../../global/defaults";

  $: tableData = [];

  onMount(async () => {
    tableData = await getEventData();
  });
</script>

<div class="event-page">
  {#if tableData?.length > 0}
    <Canvas {tableData} defaultColumns={defaultEventColumns} />
  {:else}
    <Spinner />
  {/if}
</div>
