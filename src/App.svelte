<script lang="ts">
  import DataTable from "./components/data_table/DataTable.svelte";
  import { tempGetData } from "../backend/src/api/openTrack";

  import "./app.style.css";

  let columns: Array<string>;

  let data: Array<Record<string, unknown>>;

  const getTableData = async (): void => {
    const fetchedData = await tempGetData();
    data = fetchedData.results;
    columns = Object.keys(data[0]).map((val) =>
      val.replaceAll("_", " ").toUpperCase()
    );
  };

  getTableData();

  $: tableData = data?.map((d) => Object.keys(d).map((key) => [d[key]]));
</script>

{#if data}
  <div class="data-table">
    <DataTable headers={columns} rows={tableData} />
  </div>
{/if}
