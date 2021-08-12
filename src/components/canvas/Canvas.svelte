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
  import { GTYPE } from "../../../global/constants/constants";
  import {
    ButtonDropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Button,
  } from "sveltestrap";

  export let tableData;
  export let selectedSource = GTYPE.REMOTE;
  let headerData = getHeaderData(tableData);
  let rowData = getTableData(tableData);
</script>

<div class="dropdownButton">
  <ButtonDropdown>
    <DropdownToggle caret>{selectedSource}</DropdownToggle>
    <DropdownMenu>
      <DropdownItem header>{UIText.SOURCES_HEADER}</DropdownItem>
      <DropdownItem on:click={() => (selectedSource = GTYPE.LOCAL)}
        >{GTYPE.LOCAL}</DropdownItem
      >
      <DropdownItem on:click={() => (selectedSource = GTYPE.REMOTE)}
        >{GTYPE.REMOTE}</DropdownItem
      >
      <DropdownItem on:click={() => (selectedSource = GTYPE.SEMI)}
        >{GTYPE.SEMI}</DropdownItem
      >
    </DropdownMenu>
  </ButtonDropdown>
</div>
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
