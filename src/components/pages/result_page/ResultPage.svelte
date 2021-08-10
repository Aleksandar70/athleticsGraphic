<script>
  import { onMount } from "svelte";
  import Canvas from "../../canvas/Canvas.svelte";
  import { getResults } from "../../../api/result.api";

  export let eventId;

  $: tableData = [];

  onMount(async () => {
    const requestData = {
      eventId: eventId,
      gType: "remote",
    };
    tableData = await getResults(requestData);
  });
</script>

<Canvas {tableData} />
