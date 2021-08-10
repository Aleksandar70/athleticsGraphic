<script>
  import DataTable from "../data_table/DataTable.svelte";
  import { UIText } from "../../../global/constants/ui_text";
  import ColumnDisplayOptions from "../column_display_options/ColumnDisplayOptions.svelte";
  import Modal, { getModal } from "../modal/Modal.svelte";
  import { getTableData, getHeaderData } from "../data_table/table.helper";

  import "./canvas.style.css";
  import Spinner from "../spinner/Spinner.svelte";

  export let tableData;

  $: headerData = getHeaderData(tableData);
  $: rowData = getTableData(tableData);
</script>

<div class="canvas">
  {#if headerData?.length > 0 && rowData?.length > 0}
    <Modal>
      <ColumnDisplayOptions bind:headerData bind:rowData />
    </Modal>
    <button on:click={() => getModal().open()}>{UIText.COLUMN_TOGGLE}</button>
    <DataTable {headerData} {rowData} />
  {:else}
    <Spinner />
  {/if}
</div>
