<script lang="ts">
  import Canvas from "../../../components/canvas/Canvas.svelte";
  import { onMount } from "svelte";
  import { getEventData } from "../../../api/event.api";

  $: event = [];

  onMount(async () => {
    event = await getEventData();
  });
</script>

<Canvas tableData={event} />
