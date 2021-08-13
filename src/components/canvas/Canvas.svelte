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
  import { Button } from "sveltestrap";
  import Dropdown from "../dropdown/Dropdown.svelte";

  export let tableData;
  export let defaultColumns;

  let headerData = getHeaderData(tableData, defaultColumns);
  let rowData = getTableData(tableData, defaultColumns);
</script>

<Dropdown />
<div class="canvas">
  <Modal>
    <ColumnDisplayOptions bind:headerData bind:rowData />
  </Modal>
  <Button on:click={() => getModal().open()}>{UIText.COLUMN_TOGGLE}</Button>
  <DataTable {headerData} {rowData} />
  <Button
    on:click={() => updateCompetitors(getUpdatedTable(tableData, rowData))}
    >{UIText.TABLE_SAVE}</Button
  >
</div>
