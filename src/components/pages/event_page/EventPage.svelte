<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import Canvas from "../../canvas/Canvas.svelte";
  import { onMount } from "svelte";
  import { getFieldLinks } from "../../data_table/table.helper";
  import type { RawData } from "../../../../global/types";
  import { getEventData } from "../../../api/event.api";

  let event: RawData = [];

  $: links = getFieldLinks(event);

  onMount(async () => {
    event = await getEventData();
  });
</script>

<div class="app">
  {#if event.length === 0}
    <h1>Loading...</h1>
  {:else}
  <Canvas tableData={event} {links} />
  {/if}
</div>
