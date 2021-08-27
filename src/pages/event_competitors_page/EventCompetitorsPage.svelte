<script>
  import { onMount } from "svelte";
  import Canvas from "../../components/canvas/Canvas.svelte";
  import { getEventData } from "../../api/event.api";
  import { getCompetitorsForEvent } from "../../api/competitor.api";
  import Spinner from "../../components/spinner/Spinner.svelte";
  import "./eventcompetitorspage.style.css";
  import { defaultEventCompetitorsColumns } from "../../../global/defaults";
  import { updateCompetitors } from "../../api/competitor.api";

  export let eventId;

  $: eventData = [];

  onMount(async () => {
    const eventDatas = await getEventData(eventId);
    eventData = await getCompetitorsForEvent(eventId);
    console.log("competitorData ->? ", eventData);
  });
</script>

<div class="event-competitors--page">
  {#if eventData.length > 0}
    <Canvas
      {eventData}
      defaultColumns={defaultEventCompetitorsColumns}
      updateAction={updateCompetitors}
    />
  {:else}
    <Spinner />
  {/if}
</div>
