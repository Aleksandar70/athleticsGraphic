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
  import { Button, Dropdown } from "sveltestrap";

  let dropdownTrigger;
  export let tableData;

  let headerData = getHeaderData(tableData);
  let rowData = getTableData(tableData);
</script>

<div class="canvas">
  <Modal>
    <ColumnDisplayOptions bind:headerData bind:rowData />
  </Modal>
  <Dropdown triggerElement={dropdownTrigger}>
    <Button
      type="button"
      class="btn btn-secondary dropdown-toggle"
      bind:this={dropdownTrigger}
    >
      Dropdown
    </Button>
    <div slot="DropdownMenu">
      <Button class="dropdown-item" type="button">Action</Button>
      <Button class="dropdown-item" type="button">Another action</Button>
      <Button class="dropdown-item" type="button">Something else here</Button>
    </div>
  </Dropdown>
  <Button on:click={() => getModal().open()}>{UIText.COLUMN_TOGGLE}</Button>
  <DataTable {headerData} {rowData} />
  <Button
    on:click={() => updateCompetitors(getUpdatedTable(tableData, rowData))}
    >{UIText.TABLE_SAVE}</Button
  >
</div>
