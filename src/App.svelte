<script lang="ts">
  import DataTable from "./components/data_table/DataTable.svelte";
  import { getOpenTrackData } from "../backend/src/api/openTrack";

  const columns = ["First Name", "Last Name", "Bib"];

  let data;

  const getData = async () => {
    const fetchedData = await getOpenTrackData();
    data = fetchedData.results;
  };

  getData();

  $: tableData = data?.map((d) => [d.first_name, d.last_name, d.bib]);
</script>

{#if data}
  <div class="data-table">
    <DataTable headers={columns} rows={tableData} />
  </div>
{/if}

<style lang="scss">
  .data-table {
    display: grid;
    place-items: center;
  }
</style>
