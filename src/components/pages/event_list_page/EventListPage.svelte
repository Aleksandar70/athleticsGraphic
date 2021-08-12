<script lang="ts">
  import Canvas from "../../canvas/Canvas.svelte";
  import { onMount } from "svelte";
  import { getEventData } from "../../../api/event.api";
  import Spinner from "../../spinner/Spinner.svelte";
  import "./eventlistpage.style.css";

  $: tableData = [];

  onMount(async () => {
    tableData = await getEventData();
  });
</script>

<div class="event-page">
  {#if tableData?.length > 0}
    <Canvas {tableData} />
  {:else}
    <Spinner />
  {/if}
</div>
