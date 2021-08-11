<script>
  import DataTable from "../data_table/DataTable.svelte";
  import { UIText } from "../../../global/constants/ui_text";
  import ColumnDisplayOptions from "../column_display_options/ColumnDisplayOptions.svelte";
  import Modal, { getModal } from "../modal/Modal.svelte";
  import {
    getTableData,
    getHeaderData,
    getUpdatedTable,
  } from "../data_table/table.helper";
  import "./canvas.style.css";
  import { updateCompetitors } from "../../api/competitor.api";

  export let tableData;

  let headerData = getHeaderData(tableData);
  let rowData = getTableData(tableData);
</script>

<div class="canvas">
  <Modal>
    <ColumnDisplayOptions bind:headerData bind:rowData />
  </Modal>
  <button on:click={() => getModal().open()}>{UIText.COLUMN_TOGGLE}</button>
  <DataTable {headerData} {rowData} />
  <button
    on:click={() => updateCompetitors(getUpdatedTable(tableData, rowData))}
    >{UIText.TABLE_SAVE}</button
  >
</div>
