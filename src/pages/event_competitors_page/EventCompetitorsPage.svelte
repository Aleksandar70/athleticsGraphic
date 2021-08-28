<script lang="ts">
  import { onMount } from "svelte";
  import Canvas from "../../components/canvas/Canvas.svelte";
  import { getCompetitorResultsData } from "../../components/data_table/table.helper";
  import Spinner from "../../components/spinner/Spinner.svelte";
  import "./eventcompetitorspage.style.css";
  import { defaultEventCompetitorsColumns } from "../../../global/defaults";
  import { updateCompetitors } from "../../api/competitor.api";
  import { Button, Collapse } from "sveltestrap";

  export let eventId;

  let hasHeats = false;
  let heatToggle = new Map();

  let tableData = [];

  const toggle = (heatName: string) => {
    const currentState = heatToggle.get(heatName);
    heatToggle.set(heatName, !currentState);
    heatToggle = heatToggle;
  };

  onMount(async () => {
    tableData = await getCompetitorResultsData(eventId);
    hasHeats = Object.keys(tableData[0]).length === 2;
    if (hasHeats) {
      tableData.forEach((data, idx) => {
        if (idx === 0) {
          heatToggle.set(data.heatName, true);
        } else {
          heatToggle.set(data.heatName, false);
        }
      });
    }
  });
</script>

<div class="event-competitors--page">
  {#if tableData.length === 0}
    <Spinner />
  {:else if !hasHeats}
    <Canvas
      {tableData}
      defaultColumns={defaultEventCompetitorsColumns}
      updateAction={updateCompetitors}
    />
  {:else}
    <div class="heat-tables">
      {#each tableData as heatTableData}
        <Button on:click={() => toggle(heatTableData.heatName)}
          >{heatTableData.heatName}</Button
        >
        <Collapse isOpen={heatToggle.get(heatTableData.heatName)}>
          <Canvas
            tableData={heatTableData.competitors}
            defaultColumns={defaultEventCompetitorsColumns}
            updateAction={updateCompetitors}
          />
        </Collapse>
      {/each}
    </div>
  {/if}
</div>
