<script lang="ts">
  import DataTable from "./components/data_table/DataTable.svelte";
  import {
    getTableData,
    getColumns,
    parseTableData,
  } from "./components/data_table/table.helper";
  import { tempGetData } from "../backend/src/api/openTrack";

  import "./app.style.css";
</script>

<div class="data-table">
  {#await getTableData()}
    <h1>Fetching...</h1>
  {:then tableData}
    <DataTable
      fields={getColumns(tableData)}
      rows={parseTableData(tableData)}
    />
  {:catch error}
    <h1>There was some issue fetching data.</h1>
  {/await}
</div>
