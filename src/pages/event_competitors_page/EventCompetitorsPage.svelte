<script lang="ts">
  import { onMount } from "svelte";
  import Canvas from "../../components/canvas/Canvas.svelte";
  import { getCompetitorResultsData } from "../../components/data_table/table.helper";
  import Spinner from "../../components/spinner/Spinner.svelte";
  import { defaultEventCompetitorsColumns } from "../../../global/defaults";
  import { updateCompetitors } from "../../api/competitor.api";
  import { Collapse } from "sveltestrap";
  import GraphicControl from "../../components/graphic_control/GraphicControl.svelte";
  import "./eventcompetitorspage.style.css";

  export let eventId: string;

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
    hasHeats = Object.keys(tableData?.[0] ?? {}).includes("heatName");
    if (hasHeats) {
      tableData.forEach((data, idx) => {
        heatToggle.set(data.heatName, idx === 0);
      });
    }
  });
</script>

<div class="event-competitors--page">
  {#if tableData.length === 0}
    <Spinner />
  {:else if !hasHeats}
    <GraphicControl />
    <Canvas
      {tableData}
      defaultColumns={defaultEventCompetitorsColumns}
      updateAction={updateCompetitors}
    />
  {:else}
    <GraphicControl />
    <div class="heat-tables">
      {#each tableData as heatTableData}
        <div
          class="toggle-button"
          on:click={() => toggle(heatTableData.heatName)}
        >
          {heatTableData.heatName}
        </div>
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
