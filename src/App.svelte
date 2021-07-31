<script lang="ts">
  import DataTable from "./components/data_table/DataTable.svelte";
  import { tempGetData } from "../backend/src/api/openTrack";

  let columns = [];

  let data;

  const getData = async () => {
    const fetchedData = await tempGetData();
    data = fetchedData.results;
    columns = Object.keys(data[0]).map((val) =>
      val.replaceAll("_", " ").toUpperCase()
    );
  };

  getData();

  $: tableData = data?.map((d) => Object.keys(d).map((key) => [d[key]]));
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
