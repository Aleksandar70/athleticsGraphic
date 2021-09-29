<script lang="ts">
  import Canvas from "../../components/canvas/Canvas.svelte";
  import { getEventsData, updateEvents } from "../../api/event.api";
  import Spinner from "../../components/spinner/Spinner.svelte";
  import { defaultEventColumns } from "../../../global/defaults";
  import { UIText } from "../../../global/constants/ui_text";
  import { currentEventId } from "../../stores/table.store";
  import { _ } from "svelte-i18n";
  import "./eventlistpage.style.css";

  currentEventId.set("events");
</script>

<div class="event-list--page">
  {#await getEventsData()}
    <Spinner />
  {:then tableData}
    {#if tableData.length > 0}
      <Canvas
        {tableData}
        defaultColumns={defaultEventColumns}
        setSearch={{ enable: true, key: "name" }}
        updateAction={updateEvents}
      />
    {:else}
      <h1>{UIText.NO_RESULTS_INIT}</h1>
    {/if}
  {/await}
</div>
