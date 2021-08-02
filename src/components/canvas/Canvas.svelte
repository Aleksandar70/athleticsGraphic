<script>
  import DataTable from "../data_table/DataTable.svelte";
  import ColumnDisplayOptions from "../column_display_options/ColumnDisplayOptions.svelte";
  import Modal, { getModal } from "../modal/Modal.svelte";
  import {
    parseHeaderData,
    parseTableData,
    getEmptyColumns,
    getTableData,
    getHeaderData,
  } from "../data_table/table.helper";

  import "./canvas.style.css";

  export let tableData = [];

  let headers = parseHeaderData(tableData);
  let rows = parseTableData(tableData);

  let emptyColumns = getEmptyColumns(rows);

  let headerData = getHeaderData(headers, emptyColumns, tableData.length);
  let rowData = getTableData(rows, emptyColumns);
</script>

<div class="canvas">
  <Modal>
    <ColumnDisplayOptions bind:headerData bind:rowData />
  </Modal>
  <button on:click={() => getModal().open()}>Add / Remove Columns</button>
  <DataTable {headerData} {rowData} />
</div>
