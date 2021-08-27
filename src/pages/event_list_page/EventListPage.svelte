<script lang="ts">
  import Canvas from "../../components/canvas/Canvas.svelte";
  import { onMount } from "svelte";
  import { getEventsData, updateEvents } from "../../api/event.api";
  import Spinner from "../../components/spinner/Spinner.svelte";
  import "./eventlistpage.style.css";
  import { defaultEventColumns } from "../../../global/defaults";

  $: tableData = [];

  onMount(async () => {
    tableData = await getEventsData();
  });
</script>

<div class="event-list--page">
  {#if tableData?.length > 0}
    <Canvas
      {tableData}
      defaultColumns={defaultEventColumns}
      setSearch={{ enable: true, key: "name" }}
      updateAction={updateEvents}
    />
  {:else}
    <Spinner />
  {/if}
</div>
