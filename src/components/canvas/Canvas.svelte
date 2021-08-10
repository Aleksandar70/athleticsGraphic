<script>
  import DataTable from "../data_table/DataTable.svelte";
  import { UIText } from "../../../global/constants/ui_text";
  import ColumnDisplayOptions from "../column_display_options/ColumnDisplayOptions.svelte";
  import Modal, { getModal } from "../modal/Modal.svelte";
  import {
    parseHeaderData,
    getFieldLinks,
    parseTableData,
    getEmptyColumns,
    getTableData,
    getHeaderData,
  } from "../data_table/table.helper";

  import "./canvas.style.css";

  export let tableData;

  $: headers = parseHeaderData(tableData);
  $: rows = parseTableData(tableData);

  $: emptyColumns = getEmptyColumns(rows);
  $: links = getFieldLinks(tableData);

  $: headerData = getHeaderData(headers, emptyColumns, tableData.length);
  $: rowData = getTableData(rows, emptyColumns, links);
</script>

{#if headerData && rowData}
  <div class="canvas">
    <Modal>
      <ColumnDisplayOptions bind:headerData bind:rowData />
    </Modal>
    <button on:click={() => getModal().open()}>{UIText.COLUMN_TOGGLE}</button>
    <DataTable {headerData} {rowData} />
  </div>
{:else}
  <h1>Loading...</h1>
{/if}
